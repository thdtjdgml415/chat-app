import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/share/ui/form";
import { Input } from "..";

interface CustomInputProps {
  name: string;
  form: any;
  label: string;
  placeholder: string;
  type?: string;
}

export default function CustomInput({
  name,
  form,
  label,
  placeholder,
  type,
}: CustomInputProps) {
  return (
    <FormField
      control={form.control}
      name={`${name}`}
      render={({ field }: any) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
