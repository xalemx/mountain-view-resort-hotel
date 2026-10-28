// An in-memory stand-in for the database and the mail service.
//
// It copies the two behaviours the notification code relies on: a conditional
// write is applied to the rows that match at the moment it runs, and the result
// is read back afterwards. That is what makes a double send observable here
// rather than merely assumed.
export function fakeBase44({ rows = [], sendEmail } = {}) {
  const store = new Map(rows.map((row) => [row.id, { ...row }]));
  const calls = { sendEmail: [], updates: [] };

  const matches = (row, filter) =>
    Object.entries(filter).every(([key, condition]) => {
      if (key === "id") return row.id === condition;
      if (condition && typeof condition === "object") {
        if ("$nin" in condition) return !condition.$nin.includes(row[key]);
        if ("$ne" in condition) return row[key] !== condition.$ne;
      }
      return row[key] === condition;
    });

  const Enquiry = {
    async get(id) {
      const row = store.get(id);
      if (!row) {
        const error = new Error("not found");
        error.status = 404;
        throw error;
      }
      return { ...row };
    },
    async update(id, patch) {
      const row = store.get(id);
      if (!row) {
        const error = new Error("not found");
        error.status = 404;
        throw error;
      }
      Object.assign(row, patch);
      calls.updates.push({ id, patch });
      return { ...row };
    },
    async updateMany(filter, operation) {
      const patch = operation?.$set || operation || {};
      let count = 0;
      store.forEach((row) => {
        if (matches(row, filter)) {
          Object.assign(row, patch);
          count += 1;
        }
      });
      calls.updates.push({ filter, patch, count });
      return { updated: count };
    },
  };

  const base44 = {
    asServiceRole: {
      entities: { Enquiry },
      integrations: {
        Core: {
          async SendEmail(message) {
            calls.sendEmail.push(message);
            return sendEmail ? sendEmail(message) : { success: true };
          },
        },
      },
    },
  };

  return { base44, store, calls };
}