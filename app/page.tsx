import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import {Image} from "@nextui-org/react";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
				<Image
      isBlurred
      width={500}
      src="https://sportishka.com/uploads/posts/2022-04/1650595896_23-sportishka-com-p-neboskrebi-moskva-siti-krasivo-foto-24.jpg"
      alt="NextUI Album Cover"
     
    />
				</Snippet>
			</div>
		</section>
	);
}
