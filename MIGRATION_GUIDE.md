# Migration Guide: ObjectIds to Numeric IDs

This guide explains how to migrate your MongoDB collections from ObjectIds to numeric sequence IDs.

## What Changed

All models now use **numeric sequence IDs** instead of MongoDB's default ObjectIds:
- **Users**: Numeric IDs (1, 2, 3...)
- **Products**: Numeric IDs (1, 2, 3...)
- **Carts**: Numeric IDs (1, 2, 3...)
- **Orders**: Numeric IDs (1, 2, 3...)
- **Reservations**: Numeric IDs (1, 2, 3...)

## Benefits

✅ **Human-readable IDs**: Order #1234 instead of `507f1f77bcf86cd799439011`
✅ **Shorter URLs**: `/product/123` vs `/product/507f1f77bcf86cd799439011`
✅ **Better UX**: Easier for customer support ("Your order is #5678")
✅ **Smaller storage**: 4-8 bytes vs 12 bytes per ID

## Migration Steps

### ⚠️ IMPORTANT: Backup First!

**Before running migration, backup your database!**

```bash
# Example MongoDB backup command
mongodump --uri="your-mongodb-uri" --out=./backup-$(date +%Y%m%d)
```

### Step 1: Run Migration Script

```bash
cd server
npm run migrate
```

The migration script will:
1. Create a `sequences` collection to track ID counters
2. Convert all existing ObjectIds to numeric IDs
3. Update all foreign key references
4. Preserve all data and timestamps

### Step 2: Verify Migration

After migration, check:
- All collections have numeric `_id` fields
- Foreign key references are updated correctly
- Sequence counters are initialized

```javascript
// Check sequences
db.sequences.find()

// Check a sample document
db.users.findOne()
db.products.findOne()
```

### Step 3: Update Frontend (if needed)

The frontend should work without changes since:
- API responses still use `_id` field
- Mongoose automatically handles numeric IDs
- Routes using `:id` params will work with numbers

However, if you have any hardcoded ObjectId validation or formatting, update those.

## For New Installations

If you're starting fresh (no existing data):
1. Models are already configured for numeric IDs
2. No migration needed
3. First document will get ID `1`, second gets `2`, etc.

## Troubleshooting

### Migration fails with "duplicate key"
- This means some documents already have numeric IDs
- Check your database: `db.users.find({ _id: { $type: "number" } })`
- You may need to clean up or adjust the migration script

### Foreign key references broken
- Check that all referenced documents were migrated
- Verify user/product IDs in carts/orders/reservations

### Sequence counters not initialized
- Manually create sequence documents:
```javascript
db.sequences.insertMany([
  { _id: "users", seq: 0 },
  { _id: "products", seq: 0 },
  { _id: "carts", seq: 0 },
  { _id: "orders", seq: 0 },
  { _id: "reservations", seq: 0 }
])
```

## Rollback (if needed)

If you need to rollback:
1. Restore from backup
2. Revert model changes (remove `_id: Number` and pre-save hooks)
3. Restart server

## Technical Details

### Sequence Counter System

The `Sequence` model tracks counters for each collection:
```javascript
{
  _id: "users",      // Collection name
  seq: 123          // Last used ID
}
```

### Pre-save Hooks

Each model has a pre-save hook that:
- Checks if document is new (`isNew`)
- Checks if `_id` is already set
- If not, gets next sequence number and assigns it

### Foreign Key References

All references updated from:
```javascript
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
```

To:
```javascript
user: { type: Number, ref: 'User' }
```

## Support

If you encounter issues during migration, check:
1. Database connection string is correct
2. You have write permissions
3. No other processes are modifying the database
4. Backup was created successfully
