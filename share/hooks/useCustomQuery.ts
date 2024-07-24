import { useQuery } from "@tanstack/react-query";

function useCustomQuery<T>(
  queryKey: string[],
  queryFunction: () => Promise<T>,
  selectFunction = (data: any) => data,
  initialData?: T
) {
  const { data, error, isPending, isLoading } = useQuery({
    queryKey,
    queryFn: queryFunction,
    initialData: initialData,
    select: selectFunction,
  });

  return { data, error, isPending, isLoading };
}

export default useCustomQuery;
