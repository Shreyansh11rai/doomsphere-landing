export default function FieldError({ message }: { message?: string }) {
  return message ? (
    <span className="mt-1 block text-xs font-medium text-red-600">
      {message}
    </span>
  ) : null;
}
