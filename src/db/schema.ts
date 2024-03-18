import {timestamp} from 'drizzle-orm/pg-core';
import {smallint} from 'drizzle-orm/pg-core';
import {char} from 'drizzle-orm/pg-core';
import {real} from 'drizzle-orm/pg-core';
import {integer, text} from 'drizzle-orm/pg-core';
import {pgTable} from 'drizzle-orm/pg-core'

export const dimFireInsuranceProducts = pgTable("dim_fire_insurance_products", {
  product_id: integer("product_id").primaryKey(),
  product_name: text("product_name").notNull()
})

export const dimClient = pgTable("dim_client", {
  client_id: integer("client_id").primaryKey(),
  client_name: text("client_name").notNull()
});

export const dimCity = pgTable("dim_city", {
  city_id: integer("city_id").primaryKey(),
  city_name: text("city_name").notNull(),
  state_name: text("state_name").notNull()
});

export const dimDate = pgTable("dim_date", {
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

export const facts = pgTable("facts", {
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


