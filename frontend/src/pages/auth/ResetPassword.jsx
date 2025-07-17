import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/services/api";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const response = await resetPassword(token, password);
      if (response.success) {
        toast.success("Password reset successful");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      } else {
        alert(response.message || "Failed to reset password.");
        toast.error(response.message || "Failed to reset password.");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Error to reset password:", error);
      setIsLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create New Password</CardTitle>
          <CardDescription>Enter the new password below</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="Password">Password</Label>
            <Input
              id="Password"
              type="ypassword"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="Password">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            {isLoading ? "Loading..." : "Create a new Password"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ResetPasswordPage;
