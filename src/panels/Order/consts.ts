const enum EOrderStatus {
  NEW = 'new',
  CREATING = 'creating',
  PACKING = 'packing',
  DELIVERING = 'delivering',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  AWAITING_PAYMENT = 'awaiting_payment',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const progressStatuses = [EOrderStatus.CREATING, EOrderStatus.DELIVERING, EOrderStatus.PACKING];

export { EOrderStatus, progressStatuses };
