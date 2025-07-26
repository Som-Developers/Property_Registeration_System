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
import { useResetPasswordMutation } from "../../redux/api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ✅ Validation schema
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is required"),
});

function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({ password }) => {
    try {
      await resetPassword({ token, password });
      toast.success("Password reset successful");
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Reset failed:", error);
      toast.error(error?.data?.message || "Failed to reset password.");
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
          <CardTitle className="text-2xl">Create New Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Create New Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}

export default ResetPasswordPage;
