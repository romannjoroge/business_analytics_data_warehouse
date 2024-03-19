import {serial} from 'drizzle-orm/pg-core';
import {timestamp} from 'drizzle-orm/pg-core';
import {smallint} from 'drizzle-orm/pg-core';
import {char} from 'drizzle-orm/pg-core';
import {real} from 'drizzle-orm/pg-core';
import {integer, text} from 'drizzle-orm/pg-core';
import {pgTable} from 'drizzle-orm/pg-core'

 const dimFireInsuranceProducts = pgTable("dim_fire_insurance_products", {
  product_id: integer("product_id").primaryKey(),
  product_name: text("product_name").notNull()
})

 const dimClient = pgTable("dim_client", {
  client_id: integer("client_id").primaryKey(),
  client_name: text("client_name").notNull()
});

const dimCity = pgTable("dim_city", {
  city_id: integer("city_id").primaryKey(),
  city_name: text("city_name").notNull(),
  state_name: text("state_name").notNull()
});

const dimDate = pgTable("dim_date", {
  transaction_date: timestamp("transaction_date").primaryKey(),
  year: smallint("year").notNull(),
  month_number: char("month_number", {length: 2}).notNull(),
  year_month_number: char("year_month_number", {length: 7}).notNull(),
  year_month_short: char("year_month_short", {length: 8}).notNull(),
  month_name_short: char("month_name_short", {length: 3}).notNull(),
  month_name_long: char("month_name_long", {length: 9}).notNull(),
  day_of_week_number: smallint("day_of_week_number").notNull(),
  day_of_week_short: char("day_of_week_short", {length: 3}).notNull(),
  quater: char("quater", {length: 2}).notNull(),
  year_quater: char("year_quater", {length: 7}).notNull(),
  week_number: smallint("week_number").notNull()
});

const facts = pgTable("facts", {
  billing_id: integer("billing_id").primaryKey(),
  statement_account_no: text("statement_account_no").notNull(),
  statement_date: timestamp("statement_date").notNull().references(() => dimDate.transaction_date),
  policy_number: text("policy_number").notNull(),
  client_id: integer("client_id").notNull().references(() => dimClient.client_id),
  building_city_id: integer("building_city_id").notNull().references(() => dimCity.city_id),
  product_id: integer("product_id").notNull().references(() => dimFireInsuranceProducts.product_id),
  premium: real("premium").notNull(),
  other_charges: real("other_charges").notNull(),
  total_charges: real("total_charges").notNull(),
  coverage_date_from: timestamp("coverage_date_from").notNull().defaultNow(),
  coverage_date_to: timestamp("coverage_date_to").notNull().defaultNow(),
  total_amount_paid: real("total_amount_paid").notNull()
});

const fire_insurance_product = pgTable("staging_fire_insurance_product", {
  product_id: serial("product_id").primaryKey(),
  product_name: char("product_name", {length: 30})
});

const client = pgTable("staging_client", {
  client_id: serial("client_id").primaryKey(),
  username: char("username", {length: 30}),
  lastname: char("lastname", {length: 30}),
  firstname: char("firstname", {length: 30}),
  middlename: char("middlename", {length: 30}),
  address: char("address", {length: 255}),
  city_id: integer("city_id").references(() => city.city_id)
});

const state = pgTable("staging_state", {
  state_id: serial("state_id").primaryKey(),
  state_name: char("state_name", {length: 30})
});

const city = pgTable("staging_city", {
  city_id: serial("city_id").primaryKey(),
  city_name: char("city_name", {length: 20}),
  state_id: integer("state_id").references(() => state.state_id)
});

const policy = pgTable("staging_policy", {
  policy_id: serial("policy_id").primaryKey(),
  policy_number: char("policy_number", {length: 12}),
  client_id: integer("client_id").notNull().references(() => client.client_id),
  product_id: integer("product_id").notNull().references(() => fire_insurance_product.product_id),
  building_coverage: real("building_coverage"),
  contents_coverage: real("contents_coverage"),
  building_address: char("building_address", {length: 255}),
  building_city_id: integer("building_city_id").references(() => city.city_id),
  coverage_date_from: timestamp("coverage_date_from"),
  coverage_date_to: timestamp("coverage_date_to"),
  modified_date: timestamp("modified_date")
});

const billing = pgTable("staging_billing", {
  billing_id: serial("billing_id").primaryKey(),
  statement_date: timestamp("statement_date").notNull(),
  statement_account_no: char("statement_account_no", {length: 12}).notNull(),
  policy_id: integer("policy_id").notNull().references(() => policy.policy_id),
  premium: real("premium").notNull(),
  other_charges: real("other_charges").notNull(),
  total_charges: real("total_charges").notNull()
})

const payments = pgTable("staging_payments", {
  payment_id: serial("payment_id").primaryKey(),
  date_paid: timestamp("date_paid").notNull(),
  official_record: char("official_record", {length: 5}).notNull(),
  amount_paid: char("amount_paid", {length: 32}).notNull(),
  billing_id: integer("billing_id").references(() => billing.billing_id)
});

export const staging = {
  payments,
  billing,
  policy,
  city,
  state,
  fire_insurance_product,
  client
};

export const warehouse = {
  facts,
  dimDate,
  dimCity,
  dimClient,
  dimFireInsuranceProducts
};
