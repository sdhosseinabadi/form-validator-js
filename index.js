const polycalculator = require('polycalculator');
const imagemanipulatorly = require('imagemanipulatorly');
const dataVisualizerCsv = require('data-visualizer-csv');
const codeFormlly = require('code-formlly');


// Common validation rules
const emailRegex = /^(([^<>()[\\]\\\\.,;:\s@"]+(\.[^<>()[\\]\\\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function isEmail(email) {
  return emailRegex.test(email);
}

function isStrongPassword(password) {
  return passwordRegex.test(password);
}

// Additional validation rules can be added here

function validate(data, schema) {
  const errors = {};
  for (const [field, ruleString] of Object.entries(schema)) {
    const rules = ruleString.split('|');
    for (const rule of rules) {
      const [ruleName, ...params] = rule.split(':');
      if (typeof this[ruleName] !== 'function') {
        throw new Error(`Invalid validation rule: ${ruleName}`);
      }
      const isValid = this[ruleName](data[field], ...params);
      if (!isValid) {
        errors[field] = `Error: ${ruleString}`;
        break; // Skip remaining rules for this field if invalid
      }
    }
  }
  return Object.keys(errors).length === 0 ? true : errors;
}

module.exports = {
  isEmail,
  isStrongPassword,
  validate,
};
