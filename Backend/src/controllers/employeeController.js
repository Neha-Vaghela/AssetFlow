const Employee = require("../models/employeeModel");
const User = require("../models/user.model");
const Department = require("../models/departmentModel");

const employeeController = {

    // Employee List
    async getEmployees(req, res) {
        try {

            const employees = await Employee.find()
                .populate("user", "name email role")
                .populate("department", "departmentName");

            return res.status(200).json({
                success: true,
                count: employees.length,
                employees
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Add Employee
    async addEmployee(req, res) {
        try {

            const {
                userId,
                department,
                status
            } = req.body;

            const existingEmployee = await Employee.findOne({
                user: userId
            });

            if (existingEmployee) {
                return res.status(400).json({
                    success: false,
                    message: "Employee already exists"
                });
            }

            const employee = await Employee.create({
                user: userId,
                department,
                status
            });

            return res.status(201).json({
                success: true,
                message: "Employee added successfully",
                employee
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Promote Employee (Change Role)
    async changeRole(req, res) {
        try {

            const { userId, role } = req.body;

            const allowedRoles = [
                "Employee",
                "Department Head",
                "Asset Manager"
            ];

            if (!allowedRoles.includes(role)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid role"
                });
            }

            const user = await User.findByIdAndUpdate(
                userId,
                { role },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Role updated successfully",
                user
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Edit Employee
    async editEmployee(req, res) {
        try {

            const { id } = req.params;

            const {
                department,
                status
            } = req.body;

            const employee = await Employee.findByIdAndUpdate(
                id,
                {
                    department,
                    status
                },
                { new: true }
            );

            if (!employee) {
                return res.status(404).json({
                    success: false,
                    message: "Employee not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Employee updated successfully",
                employee
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

};

module.exports = employeeController;