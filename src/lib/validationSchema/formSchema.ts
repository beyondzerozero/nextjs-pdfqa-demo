import { z } from "zod";

export const formSchema = z.object({
  question: z
    .string({ required_error: "질문을 입력하세요." })
    .min(1, { message: "질문을 입력하세요." }),
  apiKey: z.string().length(51, {
    message: "OpenAI API Key를 입력하세요",
  }),
  pdfFile: z.custom<FileList>().refine((file) => file && file.length !== 0, {
    message: "파일이 선택되지 않았습니다",
  }),
});
