/** @format */

import React from "react";
import { Text } from "./text";

export default function Storyline() {
  return (
    <div className='col-span-2 flex flex-col space-y-2 '>
      <Text variant={"p"} className='font-semibold uppercase'>Storyline</Text>
      <Text variant={"p"}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam eos
        cupiditate, esse est culpa provident voluptatibus illum sapiente eveniet
        quos ea nobis molestiae commodi tempore eaque sit error nulla suscipit
        quod numquam accusamus veritatis! Inventore molestiae necessitatibus
        consectetur facilis exercitationem officiis, veniam commodi itaque,
        eaque consequuntur, ad repellat minima placeat!
      </Text>
    </div>
  );
}
