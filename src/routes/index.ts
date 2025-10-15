import { Router } from "express";
import { AppointmentRoutes } from "./appointment";
import { DeliveryRoutes } from "./delivery";
import { EyeExamRoutes } from "./eye-exam";
import { FrameRoutes } from "./frame";
import { LensRoutes } from "./lens";
import { OptometristRoutes } from "./optometrist";
import { OrderDetailRoutes } from "./order-detail";
import { OrderRoutes } from "./order";
import { PatientRoutes } from "./patient";
import { PaymentRoutes } from "./payment";
import { SupplierRoutes } from "./supplier";
import { VisualExamRoutes } from "./visual-exam";
import { VisualHistoryRoutes } from "./visual-history";
import { UserRoutes } from "./authorization/user";
import { RoleRoutes } from "./authorization/role";
import { RoleUserRoutes } from "./authorization/role_user";
import { RefreshTokenRoutes } from "./authorization/refreshToken";
import { ResourceRoutes } from "./authorization/resource"; // Import ResourceRoutes
import { ResourceRoleRoutes } from "./authorization/resourceRole"; // Import ResourceRoleRoutes

export class Routes {
  public appointmentRoutes: AppointmentRoutes = new AppointmentRoutes();
  public deliveryRoutes: DeliveryRoutes = new DeliveryRoutes();
  public eyeExamRoutes: EyeExamRoutes = new EyeExamRoutes();
  public frameRoutes: FrameRoutes = new FrameRoutes();
  public lensRoutes: LensRoutes = new LensRoutes();
  public optometristRoutes: OptometristRoutes = new OptometristRoutes();
  public orderDetailRoutes: OrderDetailRoutes = new OrderDetailRoutes();
  public orderRoutes: OrderRoutes = new OrderRoutes();
  public patientRoutes: PatientRoutes = new PatientRoutes();
  public paymentRoutes: PaymentRoutes = new PaymentRoutes();
  public supplierRoutes: SupplierRoutes = new SupplierRoutes();
  public visualExamRoutes: VisualExamRoutes = new VisualExamRoutes();
  public visualHistoryRoutes: VisualHistoryRoutes = new VisualHistoryRoutes();
  public userRoutes: UserRoutes = new UserRoutes();
  public roleRoutes: RoleRoutes = new RoleRoutes()
  public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
  public refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();
  public resourceRoutes: ResourceRoutes = new ResourceRoutes(); // Add ResourceRoutes instance
  public resourceRoleRoutes: ResourceRoleRoutes = new ResourceRoleRoutes(); // Add ResourceRoleRoutes instance
}
