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

    const { phone_number, amount, plan_id, description } = await req.json();

    // M-Pesa API integration would go here
    // For now, we'll simulate the process and create a payment record
    
    // Create payment record
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        user_id: user.id,
        plan_id: plan_id,
        amount: amount,
        currency: 'USD',
        payment_method: 'mpesa',
        payment_status: 'pending',
        metadata: {
          phone_number: phone_number,
          description: description
        }
      })
      .select()
      .single();

    if (paymentError) throw paymentError;

    // In a real implementation, you would:
    // 1. Make API call to M-Pesa with consumer key/secret
    // 2. Generate access token
    // 3. Initiate STK push
    // 4. Return transaction ID for polling

    console.log('M-Pesa payment initiated:', { phone_number, amount, payment_id: payment.id });

    return new Response(
      JSON.stringify({ 
        success: true, 
        payment_id: payment.id,
        message: 'Payment initiated successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('M-Pesa payment error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});