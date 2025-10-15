import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from 'morgan';
import  {sequelize, getDatabaseInfo, testConnection}  from "../database/connection";

import { Routes } from "../routes";
var cors = require("cors"); // install en node y types

// Load environment variables from the .env file
dotenv.config();

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.dbConnection(); // Call the database connection method

  }

  // Application settings
  private settings(): void {
    this.app.set('port', this.port || process.env.PORT || 4000);
  }


  private middlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json()); // leer json raw
    this.app.use(express.urlencoded({ extended: false })); //leer json form
  }


private async dbConnection(): Promise<void> {
  try {
    // Mostrar información de la base de datos seleccionada
    const dbInfo = getDatabaseInfo();
    console.log(`🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()}`);

    // Probar la conexión
    const isConnected = await testConnection();

    if (!isConnected) {
      throw new Error(`No se pudo conectar a la base de datos ${dbInfo.engine.toUpperCase()}`);
    }

    //Sincronizar la base de datos
    await sequelize.sync({ force: true });
    console.log(`📦 Base de datos sincronizada exitosamente`);

  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
    process.exit(1); // Terminar la aplicación si no se puede conectar
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
        this.routePrv.optometristRoutes.routes(this.app);
        this.routePrv.paymentRoutes.routes(this.app);
        this.routePrv.userRoutes.routes(this.app);
        this.routePrv.roleRoutes.routes(this.app);
        this.routePrv.roleUserRoutes.routes(this.app);
        this.routePrv.refreshTokenRoutes.routes(this.app);
        this.routePrv.resourceRoutes.routes(this.app);
        this.routePrv.resourceRoleRoutes.routes(this.app);
    }



  // Start the server
  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log(`🚀 Servidor ejecutándose en puerto ${this.app.get('port')}`);
  }
}
