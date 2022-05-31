import { z } from 'zod';
import vehicleSchema from './VehicleInterface';

const MotorcycleSchema = vehicleSchema.extend({
  category: z
    .enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z
    .number()
    .int()
    .gt(0)
    .lte(2500),
});

type Motorcycle = z.infer<typeof MotorcycleSchema>;

export default MotorcycleSchema;
export { Motorcycle };