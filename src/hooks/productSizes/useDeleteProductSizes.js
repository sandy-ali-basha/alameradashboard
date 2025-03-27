
import { useQueryClient, useMutation } from "react-query";
import { _ProductSizes } from "api/productSizes/productSizes";

export const useDeleteProductSizes = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _ProductSizes.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["productSizes", page, count]);
      const previousData = queryClient.getQueriesData(["productSizes", page, count]);
      queryClient.setQueryData(["productSizes", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["productSizes", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["productSizes", page, count], context.prevuiosQuery);
    },
  });
};
