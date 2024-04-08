import { api } from "../../api";

const annotationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createAnnotation: builder.mutation({
      query: ({ name, date, token }) => ({
        url: `/user/annotation/create`,
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: { annotationName: name, annotationDate: date },
      }),
    }),
    deleteAnnotation: builder.mutation({
      query: ({ id, token }) => ({
        url: `/user/annotation/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
    }),
    editAnnotation: builder.mutation({
      query: ({ id, name, date, token }) => ({
        url: `/user/annotation`,
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: { annotationId: id, annotationName: name, annotationDate: date },
      }),
    }),
  }),
});

export const {
  useDeleteAnnotationMutation,
  useEditAnnotationMutation,
  useCreateAnnotationMutation,
} = annotationSlice;
