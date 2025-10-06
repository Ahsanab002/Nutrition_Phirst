import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PromoBanner = () => {
	return (
		<section className="relative w-full">
			{/* Background image */}
			<div
				className="w-full h-[360px] md:h-[460px] lg:h-[520px] bg-cover bg-center"
				style={{
					backgroundImage: "url('/backend/Images/13.jpg')",
				}}
			/>

			{/* Overlay content */}
			<div className="absolute inset-0 flex items-center">
				{/* Keep standard page gutters but nudge left to avoid overlapping products */}
				<div className="container mx-auto px-4 lg:px-8">
					<div
						className="max-w-xl bg-black/10 backdrop-blur-[2px] rounded-xl p-6 md:p-8 md:pb-12 lg:pb-16 shadow-product translate-x-[-8px] md:translate-x-[-16px] lg:translate-x-[-24px]"
					>
						<h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
							Ultimate Wellness Collection
						</h2>
						<p className="text-base md:text-lg text-muted-foreground mb-6">
							Premium skincare and supplements designed to elevate your daily routine and support whole-body wellness.
						</p>
						<div className="flex flex-wrap gap-3">
							<Link to="/products">
								<Button variant="premium" size="lg">Shop Now</Button>
							</Link>
							<a href="/backend/Images/13.jpg" target="_blank" rel="noreferrer">
								<Button variant="minimal" size="lg">Open View</Button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PromoBanner;


