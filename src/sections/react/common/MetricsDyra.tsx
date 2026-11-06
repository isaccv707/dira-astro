import Counter from "../../../components/react/ui/Counter";
import { METRICSDYRA } from "../../../data/about/metricsDyra-data";

const MetricsDyra = () => {
  return (
    <div className="grid gap-6 rounded-clinical-lg bg-brand-ink p-6 sm:grid-cols-3 sm:p-8">
      {METRICSDYRA.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="space-y-2 border-white/20 sm:border-l sm:first:border-none sm:pl-6 first:pl-0"
        >
          <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <Counter value={item.value} suffix={item.suffix} />
          </p>
          <h3 className="text-2xs font-bold uppercase tracking-[0.2em] text-white">
            {item.label}
          </h3>
          <p className="text-xs leading-relaxed text-white/90 sm:text-sm">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MetricsDyra;
