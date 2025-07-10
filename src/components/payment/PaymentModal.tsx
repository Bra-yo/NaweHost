import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId?: string;
  planName?: string;
  amount?: number;
  onSuccess?: () => void;
}

const PaymentModal = ({ isOpen, onClose, planId, planName, amount, onSuccess }: PaymentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  const handleMpesaPayment = async () => {
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('process-mpesa-payment', {
        body: {
          phone_number: phoneNumber,
          amount: amount || 0,
          plan_id: planId,
          description: `Payment for ${planName || 'Server Plan'}`
        }
      });

      if (error) throw error;

      toast({
        title: "Payment Initiated",
        description: "Please check your phone for M-Pesa payment prompt",
      });

      // Simulate payment success for demo
      setTimeout(() => {
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully",
        });
        onSuccess?.();
        onClose();
      }, 3000);
    } catch (error) {
      console.error('M-Pesa payment error:', error);
      toast({
        title: "Payment Failed",
        description: "Failed to initiate M-Pesa payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStripePayment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-stripe-checkout', {
        body: {
          plan_id: planId,
          plan_name: planName,
          amount: amount || 0
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        onClose();
      }
    } catch (error) {
      console.error('Stripe payment error:', error);
      toast({
        title: "Payment Failed",
        description: "Failed to initiate Stripe payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (paymentMethod === "mpesa") {
      handleMpesaPayment();
    } else {
      handleStripePayment();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Pay for {planName} - ${amount}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mpesa" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              M-Pesa
            </TabsTrigger>
            <TabsTrigger value="stripe" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Card/PayPal
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="mpesa" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">M-Pesa Payment</CardTitle>
                <CardDescription>
                  Pay using your M-Pesa mobile money account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="254700123456"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handlePayment} 
                  disabled={loading || !phoneNumber}
                  className="w-full"
                >
                  {loading ? "Processing..." : `Pay $${amount} via M-Pesa`}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stripe" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Card Payment</CardTitle>
                <CardDescription>
                  Pay securely with your credit card or PayPal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handlePayment} 
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Redirecting..." : `Pay $${amount} with Card`}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;