import { FormControl, FormField, FormItem, FormLabel } from "@/share/ui/form";

import { RadioGroup, RadioGroupItem } from "@/share/ui/radio-group";

interface CustomGroupRadioProps {
  name: string;
  form: any;
  label: string;
}

export default function CustomGroupRadio({
  form,
  label,
  name,
}: CustomGroupRadioProps) {
  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }: any) => (
        <FormItem>
          <FormLabel>성별</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex items-center "
            >
              <FormItem className="flex items-center space-x-3 space-y-0 ">
                <FormControl>
                  <RadioGroupItem value="MAN" />
                </FormControl>
                <FormLabel className="font-normal">남</FormLabel>
              </FormItem>

              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="WOMAN" />
                </FormControl>
                <FormLabel className="font-normal">여</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
