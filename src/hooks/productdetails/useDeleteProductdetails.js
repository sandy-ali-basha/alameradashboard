
import { useQueryClient, useMutation } from "react-query";
import { _Productdetails } from "api/productdetails/productdetails";

export const useDeleteProductdetails = ( ) => {
  const queryClient = useQueryClient();
  return useMutation((id) => {
    if (id === undefined) {
      console.error("Mutation called with undefined id");
      return Promise.reject("Invalid ID");
    }
    return _Productdetails.delete(id);
  }, {
    onMutate: async (id) => {
      
      await queryClient.cancelQueries(["productdetails"]);
      const previousData = queryClient.getQueriesData(["productdetails"]);
      
      queryClient.setQueryData(["productdetails"], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["productdetails"]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["productdetails"], context.prevuiosQuery);
    },
  });
};
