import { sequelize } from "./src/database/db";
import { Appointment } from "./src/models/appointment";
import { Delivery } from "./src/models/delivery";
import { Frame } from "./src/models/frame";
import { Lens } from "./src/models/lens";
import { Optometrist } from "./src/models/optometrist";
import { OrderDetail } from "./src/models/order-detail";
import { Order } from "./src/models/order";
import { Patient } from "./src/models/patient";
import { Payment } from "./src/models/payment";
import { Supplier } from "./src/models/supplier";
import { VisualExam } from "./src/models/visual-exam";
import { VisualHistory } from "./src/models/visual-history";
import { faker } from '@faker-js/faker';

async function seed() {
  await sequelize.sync();

  // Patients
  const patients = [];
  for (let i = 0; i < 100; i++) {
    patients.push(await Patient.create({
      name: faker.person.fullName(),
      age: faker.number.int({ min: 1, max: 99 }),
      document_type: faker.helpers.arrayElement(["DNI", "PASSPORT", "ID"]),
      document_number: faker.string.numeric(8),
      gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
  phone: faker.string.numeric(faker.number.int({ min: 7, max: 15 })),
      email: faker.internet.email(),
      status: "ACTIVE"
    }));
  }

  // Optometrists
  const optometrists = [];
  for (let i = 0; i < 100; i++) {
    optometrists.push(await Optometrist.create({
      name: faker.person.fullName(),
      specialty: faker.helpers.arrayElement(["General", "Pediatric", "Surgery"]),
  phone: faker.string.numeric(faker.number.int({ min: 7, max: 15 })),
      email: faker.internet.email(),
      status: "ACTIVE"
    }));
  }

  // Suppliers
  const suppliers = [];
  for (let i = 0; i < 100; i++) {
    suppliers.push(await Supplier.create({
      name: faker.company.name(),
  phone: faker.string.numeric(faker.number.int({ min: 7, max: 15 })),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      status: "ACTIVE"
    }));
  }

  // Frames
  const supplierIds = suppliers.map(s => s.id).filter(Boolean);
  for (let i = 0; i < 100; i++) {
    await Frame.create({
      brand: faker.company.name(),
      model: faker.commerce.productName(),
      material: faker.helpers.arrayElement(["Metal", "Plastic", "Titanium"]),
      color: faker.color.human(),
  price: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
      stock: faker.number.int({ min: 0, max: 100 }),
      supplier_id: faker.helpers.arrayElement(supplierIds),
      image: faker.image.url(),
      status: "ACTIVE"
    });
  }

  // Lenses
  for (let i = 0; i < 100; i++) {
    await Lens.create({
      image: faker.image.url(),
      type: faker.helpers.arrayElement(["Single Vision", "Bifocal", "Progressive"]),
      material: faker.helpers.arrayElement(["Polycarbonate", "Glass", "Plastic"]),
      treatment: faker.helpers.arrayElement(["Anti-reflective", "Scratch-resistant", "None"]),
  price: faker.number.float({ min: 20, max: 300, fractionDigits: 2 }),
      stock: faker.number.int({ min: 0, max: 100 }),
      supplier_id: faker.helpers.arrayElement(supplierIds),
      status: "ACTIVE"
    });
  }

  // Orders
  const patientIds = patients.map(p => p.id).filter(Boolean);
  const optometristIds = optometrists.map(o => o.id).filter(Boolean);
  const orders = [];
  for (let i = 0; i < 100; i++) {
    orders.push(await Order.create({
      patient_id: faker.helpers.arrayElement(patientIds),
      optometrist_id: faker.helpers.arrayElement(optometristIds),
      date: faker.date.past().toISOString(),
  total: faker.number.float({ min: 100, max: 2000, fractionDigits: 2 }),
  status: "PENDING"
    }));
  }

  // OrderDetails
  const orderIds = orders.map(o => o.id).filter(Boolean);
  for (let i = 0; i < 100; i++) {
    await OrderDetail.create({
      order_id: faker.helpers.arrayElement(orderIds),
      product_type: faker.helpers.arrayElement(["LENS", "FRAME"]),
      product_id: faker.number.int({ min: 1, max: 100 }),
      quantity: faker.number.int({ min: 1, max: 5 }),
      unit_price: faker.number.float({ min: 20, max: 500,}),
  graduation: faker.string.alpha(5),
  subtotal: faker.number.float({ min: 20, max: 2000, fractionDigits: 2 }),
  status: "ACTIVE"
    });
  }

  // Appointments
  for (let i = 0; i < 100; i++) {
    await Appointment.create({
      patient_id: faker.helpers.arrayElement(patientIds),
      optometrist_id: faker.helpers.arrayElement(optometristIds),
      date: faker.date.future().toISOString(),
      reason: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(["PENDING", "ATTENDED", "CANCELLED"])
    });
  }

  // Deliveries
  for (let i = 0; i < 100; i++) {
    await Delivery.create({
      order_id: faker.helpers.arrayElement(orderIds),
      date: faker.date.future().toISOString(),
      status: faker.helpers.arrayElement(["PENDING", "READY", "DELIVERED"]),
      observations: faker.lorem.sentence()
    });
  }

  // Payments
  for (let i = 0; i < 100; i++) {
    await Payment.create({
      order_id: faker.helpers.arrayElement(orderIds),
      date: faker.date.past().toISOString(),
      amount: faker.number.float({ min: 20, max: 2000, fractionDigits: 2 }),
      method: faker.helpers.arrayElement(["CASH", "CARD", "TRANSFER"]),
      status: "PENDING"
    });
  }

  // VisualExams
  // Get all appointment ids
  const appointmentIds = await Appointment.findAll({ attributes: ['id'] }).then(arr => arr.map(a => a.id).filter(Boolean));
  for (let i = 0; i < 100; i++) {
    await VisualExam.create({
      date: faker.date.past().toISOString(),
      prescription: faker.lorem.sentence(),
  od: { esf: faker.number.float({ min: -10, max: 10, fractionDigits: 2 }), cyl: faker.number.float({ min: -5, max: 5, fractionDigits: 2 }), axis: faker.number.int({ min: 0, max: 180 }), dp: faker.number.int({ min: 50, max: 75 }) },
  oi: { esf: faker.number.float({ min: -10, max: 10, fractionDigits: 2 }), cyl: faker.number.float({ min: -5, max: 5, fractionDigits: 2 }), axis: faker.number.int({ min: 0, max: 180 }), dp: faker.number.int({ min: 50, max: 75 }) },
      appointment_id: faker.helpers.arrayElement(appointmentIds),
      status: "ACTIVE"
    });
  }

  // VisualHistories
  for (let i = 0; i < 100; i++) {
    await VisualHistory.create({
      patient_id: faker.helpers.arrayElement(patientIds),
      observations: faker.lorem.sentence(),
      date: faker.date.past(),
      status: "ACTIVE"
    });
  }

  console.log("Fake data inserted for all models!");
  process.exit(0);
}

seed();
