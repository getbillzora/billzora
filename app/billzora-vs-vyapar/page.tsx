import ComparisonPageTemplate, {
  buildComparisonMetadata,
} from "@/components/ComparisonPageTemplate";

const SLUG = "vyapar";
export const metadata = buildComparisonMetadata(SLUG);
export default function Page() {
  return <ComparisonPageTemplate slug={SLUG} />;
}
