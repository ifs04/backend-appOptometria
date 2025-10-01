import express, { Application } from "express";
import morgan from 'morgan';
import { sequelize } from "../database/db";
import { Routes } from "../routes";


// Load environment variables from the .env file

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.routes();
    this.middlewares();
    this.dbConnection(); // Call the database connection method


  }

  // Application settings
  private settings(): void {
    this.app.set('port', this.port || process.env.PORT || 4000);
  }


  private middlewares(): void {
  this.app.use(morgan('dev'));
  this.app.use(express.json()); // leer json raw
  this.app.use(express.urlencoded({ extended: false })); //leer json form
}


private async dbConnection(): Promise<void> {
  try {
    await sequelize.sync({ force: true }); // Synchronize the database
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

private routes() {
        this.routePrv.appointmentRoutes.routes(this.app);
        this.routePrv.deliveryRoutes.routes(this.app);
        this.routePrv.frameRoutes.routes(this.app);
        this.routePrv.lensRoutes.routes(this.app);
        this.routePrv.patientRoutes.routes(this.app);
        this.routePrv.orderRoutes.routes(this.app);
        this.routePrv.supplierRoutes.routes(this.app);
        this.routePrv.orderDetailRoutes.routes(this.app);
        this.routePrv.visualExamRoutes.routes(this.app);
        this.routePrv.visualHistoryRoutes.routes(this.app);
    }



  // Start the server
  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log('Server on port', this.app.get('port'));
  }
}
