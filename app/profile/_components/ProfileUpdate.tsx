"use client";

import {UploadCloud} from "lucide-react";
import React, {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {profileSave} from "@/app/actions/users";
import {useUser} from "@/components/context/UserContext";
import {Button, buttonVariants} from "@/components/ui/button";

export default function ProfileUpdate() {
  const {user} = useUser();
  const {toast} = useToast();
  const [loading, setLoading] = useState(false);
  const [newData, setnewData] = useState(user);
  const [avatar, setAvatar] = useState<any>();

  const saveProfile = async () => {
    setLoading(true);
    if (!avatar) {
      const avatarData = null;
      const {error, succsess} = JSON.parse(await profileSave(newData, avatarData));
      setLoading(false);
      if (error) {
        toast({
          title: error,
          variant: "destructive",
        });
      } else {
        toast({
          title: succsess,
          variant: "success",
        });
      }
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(avatar);
      reader.onloadend = async () => {
        const formData = reader.result;
        const {error, succsess} = JSON.parse(await profileSave(newData, formData));
        setLoading(false);
        if (error) {
          toast({
            title: error,
            variant: "destructive",
          });
        } else {
          toast({
            title: succsess,
            variant: "success",
          });
        }
      };
    }
  };

  return (
    <>
      <div className="bg-secondary/40 rounded-lg p-5 mb-5">
        <h3 className="text-lg font-bold mb-5">Profile Settings</h3>

        <div className="grid grid-cols-5 items-center my-2 ">
          <p className="col-span-1">Avatar</p>
          <label htmlFor="avatar" className="relative avatar-wrapper w-20 h-20 rounded-full cursor-pointer">
            <input
              type="file"
              id="avatar"
              className="opacity-0 absolute z-20 top-0 left-0 w-0 h-0 cursor-pointer"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0 && e.target.files[0].type.includes("image")) {
                  setAvatar(e.target.files[0]);
                } else {
                  return;
                }
              }}
              accept="image/*"
              name="avatar"
            />
            <UploadCloud
              className="avatar-drop absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              size={30}
            />
            {avatar ? (
              <div className="w-full h-full">
                <img
                  className="rounded-full object-cover w-full h-full"
                  src={URL.createObjectURL(avatar)}
                  alt="avatar"
                />
              </div>
            ) : newData.avatar ? (
              <div className="w-full h-full">
                <img className="rounded-full object-cover w-full h-full" src={newData.avatar} alt="avatar" />
              </div>
            ) : (
              <div className="">
                <img className="rounded-full object-cover w-full h-full" src={"/user.png"} alt="avatar" />
              </div>
            )}
          </label>
        </div>
        <div className="grid grid-cols-5 opacity-50 items-center my-2">
          <p className="col-span-1">Email</p>
          <input disabled className="col-span-4 cursor-not-allowed" value={newData.email} readOnly={true} />
        </div>
        <div className="grid grid-cols-5 items-center my-2">
          <p className="col-span-1">Username</p>
          <input
            className="col-span-4"
            value={newData.username}
            readOnly={false}
            onChange={(e) => {
              setnewData((prev: any) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex justify-end gap-3 mt-3">
          <Button
            onClick={() => {
              setnewData(user);
              setAvatar(null);
            }}
            className={`${buttonVariants({variant: "secondary"})}`}
          >
            cancel
          </Button>
          <Button className={`${loading ? "loading" : ""}`} onClick={saveProfile}>
            <span></span>
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
