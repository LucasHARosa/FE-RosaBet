import { ElementType } from "react";

export interface RouterProps{
  title:string;
  redirect:string;
  icon:ElementType;
  isView?:boolean;
  count?:number;
  is_live?:boolean;
  link?:string;
}

