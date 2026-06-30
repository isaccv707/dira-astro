import Counter from "../../../components/react/ui/Counter";
import { METRICSDYRA } from "../../../data/about/metricsDyra-data";

const MetricsDyra = () => {
  return (
    <div className="grid gap-6 rounded-3xl border border-white/10 bg-green-secondary p-6 shadow-xl shadow-black/20 sm:grid-cols-3 sm:p-8">
      {METRICSDYRA.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="space-y-2 border-green-primary sm:border-l sm:first:border-none sm:pl-6 first:pl-0"
        >
          <p className="text-3xl font-extrabold tracking-tight text-green-primary sm:text-4xl">
            <Counter value={item.value} suffix={item.suffix} />
          </p>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-primary">
            {item.label}
          </h3>
          <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MetricsDyra;
