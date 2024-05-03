import { formSchema } from "@/lib/validationSchema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export default function MainForm({
	onSubmit,
}: {
	onSubmit: (values: {
		question: string;
		apiKey: string;
		pdfFile: FileList;
	}) => void;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			question: "",
			apiKey: "",
		},
	});

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="apiKey"
					render={({ field }) => (
						<FormItem>
							<FormLabel>OpenAI API Key</FormLabel>
							<FormControl>
								<Input
									className="border-slate-500"
									placeholder="OpenAI API Key를 입력하세요."
									type="password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="pdfFile"
					render={({ field: { value, onChange, ...fieldProps } }) => (
						<FormItem>
							<FormLabel>PDF파일</FormLabel>
							<FormControl>
								<Input
									className="border-slate-500"
									type="file"
									accept=".pdf"
									{...fieldProps}
									onChange={(e) => {
										onChange(e.target.files && e.target.files);
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="question"
					render={({ field }) => (
						<FormItem>
							<FormLabel>질문</FormLabel>
							<FormControl>
								<Input
									className="border-slate-500"
									placeholder="질문을 입력하세요."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full" type="submit">
					보내기
				</Button>
			</form>
		</FormProvider>
	);
}