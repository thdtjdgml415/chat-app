"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/share/ui/avatar";
import { Profile } from "@/public/Images/side-menuSvg";
import ErrorAlert from "@/share/components/error-alert";
import { useEffect, useState } from "react";
import { useQueryGetProfile } from "../hooks/useQueryAccount";

export default function ProfileImage() {
  const [image, setImage] = useState("");
  const {
    data: imageData,
    error: imageError,
    isLoading: imageLoading,
  } = useQueryGetProfile();

  useEffect(() => {
    if (imageData) {
      setImage(imageData);
    }
  }, [imageData]);

  if (imageLoading) return <p>Loading...</p>;
  if (imageError) return <ErrorAlert error={imageError} />;

  return (
    <Avatar className="w-20 h-20">
      {image ? (
        <AvatarImage src={image} alt="Profile" />
      ) : (
        <AvatarFallback>
          <Profile />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
