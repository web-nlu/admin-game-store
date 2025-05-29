import {CheckCircle, Clock, XCircle} from "lucide-react";

export const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return <CheckCircle className="w-4 h-4"/>;
    case 'pending':
      return <Clock className="w-4 h-4"/>;
    case 'cancelled':
      return <XCircle className="w-4 h-4"/>;
    default:
      return <Clock className="w-4 h-4"/>;
  }
};