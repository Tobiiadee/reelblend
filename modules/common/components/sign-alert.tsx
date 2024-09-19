/** @format */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/modules/common/ui/alert-dialog";

import React, { RefObject } from "react";
import { Text } from "./text";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function SignAlert({
  trigger,
}: {
  trigger: RefObject<HTMLButtonElement>;
}) {
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger ref={trigger} className='hidden'>
        Open
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className='flex justify-between'>
          <AlertDialogHeader>
            <AlertDialogTitle>You&rsquo;re not signed in</AlertDialogTitle>
            <AlertDialogDescription>
              <Text variant={"p"}>
                You have to be signed in to perform this action
              </Text>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogCancel className='border-none outline-none px-2'>
            <X size={20} strokeWidth={1.5} />
          </AlertDialogCancel>
        </div>

        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.push("/sign-in")}>
            <Text variant={"p"}>Sign In</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
