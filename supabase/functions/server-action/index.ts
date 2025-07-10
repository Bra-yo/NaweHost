import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: userData } = await supabaseClient.auth.getUser(token);
    const user = userData.user;

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { server_id, action_type, details } = await req.json();

    // Verify server ownership
    const { data: server, error: serverError } = await supabaseClient
      .from('servers')
      .select('*')
      .eq('id', server_id)
      .eq('user_id', user.id)
      .single();

    if (serverError || !server) {
      throw new Error('Server not found or access denied');
    }

    // Create server action record
    const { data: action, error: actionError } = await supabaseClient
      .from('server_actions')
      .insert({
        server_id: server_id,
        user_id: user.id,
        action_type: action_type,
        status: 'pending',
        details: details || {}
      })
      .select()
      .single();

    if (actionError) throw actionError;

    // Simulate action processing
    let newStatus = server.status;
    switch (action_type) {
      case 'start':
        newStatus = 'active';
        break;
      case 'stop':
        newStatus = 'inactive';
        break;
      case 'restart':
        newStatus = 'restarting';
        // Simulate restart process
        setTimeout(async () => {
          await supabaseClient
            .from('servers')
            .update({ status: 'active', last_action_at: new Date().toISOString() })
            .eq('id', server_id);
          
          await supabaseClient
            .from('server_actions')
            .update({ status: 'completed' })
            .eq('id', action.id);
        }, 3000);
        break;
      case 'delete':
        // Delete server
        await supabaseClient
          .from('servers')
          .delete()
          .eq('id', server_id);
        
        await supabaseClient
          .from('server_actions')
          .update({ status: 'completed' })
          .eq('id', action.id);
        
        return new Response(
          JSON.stringify({ success: true, message: 'Server deleted successfully' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    // Update server status
    if (action_type !== 'restart') {
      await supabaseClient
        .from('servers')
        .update({ 
          status: newStatus, 
          last_action_at: new Date().toISOString()
        })
        .eq('id', server_id);

      await supabaseClient
        .from('server_actions')
        .update({ status: 'completed' })
        .eq('id', action.id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        action_id: action.id,
        new_status: newStatus,
        message: `Server ${action_type} action initiated successfully`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Server action error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});