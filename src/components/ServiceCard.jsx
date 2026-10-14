import { Icon } from "./Icons";

const ServiceCard = ({ icon, title, description, actionLabel, onAction }) => (
  <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">
    <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand-ink">
      <Icon name={icon} className="h-6 w-6" />
    </span>
    <h3 className="text-lg font-bold leading-snug text-ink">{title}</h3>
    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{description}</p>
    {onAction && (
      <button
        type="button"
        onClick={onAction}
        className="mt-4 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-brand-ink transition hover:text-brand-ink cursor-pointer"
      >
        {actionLabel}
        <Icon name="arrow" className="h-4 w-4" />
      </button>
    )}
  </article>
);

export default ServiceCard;
