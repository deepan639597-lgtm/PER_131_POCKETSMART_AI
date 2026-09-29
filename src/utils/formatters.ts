export function formatCurrency(amount: number, currency: string = 'INR'): string {
  if (isNaN(amount)) amount = 0;
  try {
    if (currency === 'INR') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amount);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (e) {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
}

export function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch (e) {
    return isoString;
  }
}

export function getPlannerName(type: string): string {
  switch (type) {
    case 'home':
      return 'Home Interior Planner';
    case 'party':
      return 'Party & Event Planner';
    case 'jewelry':
      return 'Jewelry Recommendation Planner';
    default:
      return 'Budget Planner';
  }
}
