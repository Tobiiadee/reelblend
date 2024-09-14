/** @format */

import React from "react";
import { Text } from "./text";

export default function Storyline({overview}: {overview: string}) {
  return (
    <div className='col-span-2 flex flex-col space-y-2 '>
      <Text variant={"p"} className='font-semibold uppercase'>Storyline</Text>
      <Text variant={"p"}>
        {overview}
      </Text>
    </div>
  );
}
