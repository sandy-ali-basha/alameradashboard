
import { useQueryClient, useMutation } from "react-query";
import { _Productcolors } from "api/productcolors/productcolors";

export const useDeleteProductcolors = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Productcolors.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["productcolors", page, count]);
      const previousData = queryClient.getQueriesData(["productcolors", page, count]);
      queryClient.setQueryData(["productcolors", page, count], (oldQueryData) => {
        const oldQueryDataCopy = oldQueryData?.companies.filter(
          (old) => +old.id !== +id
        );
        return oldQueryDataCopy;
      });
      return {
        previousData,
      }
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(["productcolors", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["productcolors", page, count], context.prevuiosQuery);
    },
  });
};
