import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/services/api";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await forgotPassword(email);
      if (response.success) {
        setIsSubmitted(true);
        toast.success("Reset link sent to your email!");
        setEmail(""); // Clear the email input after successful submission
      } else {
        alert(response.message || "Failed to send reset link.");
        toast.error(response.message || "Failed to send reset link.");
        setEmail(""); // Clear the email input on failure
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Forgot password</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            {isLoading ? "Loading..." : "Send Reset Link"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ForgotPasswordPage;
