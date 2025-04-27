"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/app/ui/components/buttons/Button";
import Input from "@/app/ui/components/forms/Input";
import { register } from "@/app/services/auth";
import { AxiosError } from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setIsLoading(true);
      const response = await register({
        userName: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
        router.push("/login?registered=true");
      }
    } catch (err: any) {
      if (err.message) {
        setError(err.message);
      } else {
        setError("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Hoặc{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              đăng nhập vào tài khoản có sẵn
            </Link>
          </p>
        </div>

        {error && (
          <div
            className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              label="Họ và tên"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nguyễn Văn A"
              disabled={isLoading}
            />
            <Input
              label="Email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="example@email.com"
              disabled={isLoading}
            />
            <Input
              label="Mật khẩu"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              disabled={isLoading}
            />
            <Input
              label="Xác nhận mật khẩu"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              Tôi đồng ý với{" "}
              <Link
                href="/terms"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Điều khoản sử dụng
              </Link>{" "}
              và{" "}
              <Link
                href="/privacy"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Chính sách bảo mật
              </Link>
            </label>
          </div>

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Đăng ký"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Hoặc đăng ký với
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" disabled={isLoading}>
              <Image
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Google
            </Button>
            <Button variant="outline" className="w-full" disabled={isLoading}>
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
                className="mr-2"
              />
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
