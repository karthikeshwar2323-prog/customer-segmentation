# CSV Import & Segment Generation Guide

## Overview

The Data Import feature allows you to upload customer data via CSV files and automatically generate psychological segments based on behavioral and emotional analysis.

## Accessing the Feature

Navigate to **Data Import** from the main navigation menu or visit `/import`.

## Features

### 1. CSV Upload
- Upload customer data from CSV files
- Maximum file size: 5MB
- Automatic data validation
- Real-time progress tracking
- Error reporting with detailed messages

### 2. Segment Generation
- Automatic psychological segmentation
- 6 distinct customer segments
- Based on behavioral and emotional factors
- Real-time segment assignment

## CSV File Format

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `customer_id` | String | Unique customer identifier | CUST001 |
| `name` | String | Customer full name | John Doe |
| `email` | String | Valid email address | john@example.com |
| `total_spent` | Number | Total amount spent | 5420.50 |
| `order_count` | Number | Number of orders placed | 12 |

### Optional Fields

| Field | Type | Description | Range | Default |
|-------|------|-------------|-------|---------|
| `last_order_date` | Date | Date of last order | YYYY-MM-DD | Today |
| `first_order_date` | Date | Date of first order | YYYY-MM-DD | 2023-01-01 |
| `avg_order_value` | Number | Average order value | > 0 | Calculated |
| `churn_risk` | String | Churn risk level | low/medium/high | medium |
| `sentiment_score` | Number | Sentiment score | 0-1 | 0.7 |
| `personality_openness` | Number | Openness trait | 0-1 | 0.7 |
| `personality_conscientiousness` | Number | Conscientiousness trait | 0-1 | 0.7 |
| `personality_extraversion` | Number | Extraversion trait | 0-1 | 0.6 |
| `personality_agreeableness` | Number | Agreeableness trait | 0-1 | 0.7 |
| `personality_neuroticism` | Number | Neuroticism trait | 0-1 | 0.4 |
| `emotion_joy` | Number | Joy emotion score | 0-1 | 0.7 |
| `emotion_anger` | Number | Anger emotion score | 0-1 | 0.1 |
| `emotion_sadness` | Number | Sadness emotion score | 0-1 | 0.1 |
| `emotion_fear` | Number | Fear emotion score | 0-1 | 0.2 |
| `emotion_surprise` | Number | Surprise emotion score | 0-1 | 0.3 |

## CSV Template

### Download Template

Click the **"Download Template"** button in the Data Import page to get a pre-formatted CSV file with sample data.

### Template Structure

```csv
customer_id,name,email,total_spent,order_count,last_order_date,avg_order_value,churn_risk,sentiment_score,personality_openness,personality_conscientiousness,personality_extraversion,personality_agreeableness,personality_neuroticism
CUST001,John Doe,john@example.com,5420,12,2024-11-15,451.67,low,0.85,0.75,0.82,0.68,0.79,0.35
CUST002,Jane Smith,jane@example.com,890,3,2024-10-20,296.67,high,0.45,0.62,0.71,0.55,0.68,0.72
CUST003,Bob Johnson,bob@example.com,15600,28,2024-11-28,557.14,low,0.92,0.88,0.85,0.79,0.91,0.28
```

## Upload Process

### Step 1: Prepare Your CSV File

1. Ensure all required fields are present
2. Validate data types and formats
3. Check for duplicate customer IDs
4. Verify email addresses are valid
5. Ensure numeric fields contain valid numbers

### Step 2: Upload File

1. Click **"Select File"** button
2. Choose your CSV file
3. Wait for upload to complete
4. Review upload statistics

### Step 3: Review Results

The system will display:
- **Total Rows**: Number of rows in CSV
- **Successful Rows**: Successfully imported customers
- **Failed Rows**: Rows with validation errors
- **New Customers**: Number of customers added
- **Segments Generated**: Number of segments assigned

### Step 4: Check Errors

If there are validation errors:
- Review the error list
- Fix issues in your CSV file
- Re-upload the corrected file

## Validation Rules

### Email Validation
- Must be a valid email format
- Example: `user@example.com`

### Numeric Fields
- `total_spent`: Must be a positive number
- `order_count`: Must be a positive integer
- Personality traits: Must be between 0 and 1
- Emotion scores: Must be between 0 and 1

### Date Fields
- Format: `YYYY-MM-DD`
- Example: `2024-11-15`

### Churn Risk
- Valid values: `low`, `medium`, `high`
- Case-insensitive

## Segment Generation

### Automatic Segmentation

The system automatically assigns customers to segments based on:

#### 1. Luxury Seekers
**Criteria**:
- Total spent > $10,000
- Order count > 20

**Characteristics**:
- High-value customers
- Frequent purchasers
- Premium product preference

#### 2. At-Risk Customers
**Criteria**:
- Churn risk > 0.7 OR
- Negative sentiment

**Characteristics**:
- High churn probability
- Negative feedback
- Declining engagement

#### 3. Brand-Loyal Confident Buyers
**Criteria**:
- Order count > 15
- Churn risk < 0.3

**Characteristics**:
- Repeat customers
- Low churn risk
- Consistent purchasing

#### 4. Curious Browsers
**Criteria**:
- Order count < 5
- Total spent < $1,000

**Characteristics**:
- New or infrequent customers
- Low spending
- Exploration phase

#### 5. Price-Sensitive Anxious Buyers
**Criteria**:
- Total spent < $2,000 OR
- Negative sentiment

**Characteristics**:
- Budget-conscious
- Price-driven decisions
- Anxiety about purchases

#### 6. Impulsive Emotional Buyers
**Criteria**:
- Default segment for others

**Characteristics**:
- Emotion-driven purchases
- Variable spending patterns
- Responsive to promotions

## Data Preview

After upload, you'll see a preview of the first 5 rows showing:
- Customer ID
- Name
- Email
- Total Spent
- Order Count

## Upload Statistics

### Metrics Displayed

**Customers Imported**:
- Number of successfully imported customers
- Includes segment assignment

**Segments Assigned**:
- Number of unique segments
- Distribution across segments

**Successful Rows**:
- Rows that passed validation
- Successfully processed

**Failed Rows**:
- Rows with validation errors
- Detailed error messages provided

## Error Handling

### Common Errors

#### Missing Required Field
```
Row 5: Missing required field: email
```
**Solution**: Add the missing field to the CSV

#### Invalid Email Format
```
Row 8: Invalid email format
```
**Solution**: Correct the email address format

#### Invalid Numeric Value
```
Row 12: Invalid total_spent value
```
**Solution**: Ensure the value is a valid number

#### Duplicate Customer ID
```
Row 15: Duplicate customer_id: CUST001
```
**Solution**: Use unique customer IDs

### Error Limit

The system displays the first 10 errors. If there are more:
- Fix the displayed errors first
- Re-upload to see additional errors

## Manual Segment Generation

### Generate Segments Tab

Access the **"Generate Segments"** tab to:
- View current segment distribution
- Manually trigger segment generation
- Review segmentation criteria
- Analyze segment statistics

### Segmentation Criteria

**Behavioral Factors**:
- Purchase frequency and recency
- Average order value
- Total spending patterns
- Cart abandonment rate

**Psychological Factors**:
- Sentiment analysis scores
- Emotional profile (joy, trust, fear)
- OCEAN personality traits
- Churn risk assessment

### Current Statistics

View real-time statistics:
- **Total Customers**: 5,495
- **Segments**: 6
- **Accuracy**: 98.5%

### Segment Distribution

See the distribution of customers across segments:
- Impulsive Emotional Buyers: 1,245 (22.7%)
- Price-Sensitive Anxious Buyers: 892 (16.2%)
- Brand-Loyal Confident Buyers: 567 (10.3%)
- Curious Browsers: 2,134 (38.8%)
- Luxury Seekers: 234 (4.3%)
- At-Risk Customers: 423 (7.7%)

## Best Practices

### 1. Data Quality

**Ensure Clean Data**:
- Remove duplicates before upload
- Validate email addresses
- Check numeric values
- Verify date formats

**Complete Information**:
- Include as many optional fields as possible
- More data = better segmentation
- Personality traits improve accuracy

### 2. File Preparation

**CSV Format**:
- Use UTF-8 encoding
- Include header row
- Use comma as delimiter
- Quote text fields if they contain commas

**File Size**:
- Keep files under 5MB
- Split large datasets into multiple files
- Upload in batches if needed

### 3. Validation

**Pre-Upload Checks**:
- Open CSV in spreadsheet software
- Verify all required columns present
- Check for empty cells in required fields
- Validate data types

**Post-Upload Review**:
- Check upload statistics
- Review error messages
- Verify segment distribution
- Spot-check imported data

### 4. Iterative Improvement

**Start Small**:
- Test with a small sample first
- Verify results before full upload
- Adjust data format as needed

**Monitor Results**:
- Track segment accuracy
- Review customer assignments
- Refine data collection

## Troubleshooting

### Issue: File Upload Fails

**Possible Causes**:
- File size exceeds 5MB
- File is not CSV format
- File is corrupted

**Solutions**:
- Compress or split large files
- Save as CSV format
- Re-export from source system

### Issue: All Rows Fail Validation

**Possible Causes**:
- Wrong CSV format
- Missing header row
- Incorrect delimiter

**Solutions**:
- Check CSV structure
- Ensure header row is present
- Use comma as delimiter

### Issue: Some Rows Fail

**Possible Causes**:
- Invalid data in specific rows
- Missing required fields
- Incorrect data types

**Solutions**:
- Review error messages
- Fix specific rows
- Re-upload corrected file

### Issue: Segments Not Generated

**Possible Causes**:
- Insufficient data
- All customers in one segment
- Data quality issues

**Solutions**:
- Include more customer data
- Add optional fields
- Verify data accuracy

## Integration with Other Features

### After Import

**View Customers**:
- Navigate to Customers page
- See imported customers
- Filter by segment

**Analyze Segments**:
- Go to Segments page
- Review segment details
- Analyze characteristics

**Create Offers**:
- Use Offers page
- Target specific segments
- Send personalized campaigns

**Dynamic Pricing**:
- Apply segment-based pricing
- Calculate personalized prices
- Analyze revenue impact

## API Integration (Future)

For automated imports, API endpoints will be available:

```bash
POST /api/customers/import
Content-Type: multipart/form-data

{
  "file": <csv_file>
}
```

Response:
```json
{
  "success": true,
  "stats": {
    "totalRows": 100,
    "successfulRows": 98,
    "failedRows": 2,
    "newCustomers": 98,
    "segmentsGenerated": 6
  },
  "errors": [
    "Row 5: Invalid email format",
    "Row 12: Missing required field: name"
  ]
}
```

## Security & Privacy

### Data Protection

- All uploads are processed securely
- Customer data is encrypted
- No data is shared with third parties
- Compliant with GDPR and CCPA

### Data Retention

- Uploaded files are not stored permanently
- Only processed customer data is retained
- Data can be deleted upon request

## Support

### Need Help?

- Review this guide
- Check error messages
- Download and review template
- Contact support team

### Feedback

We welcome feedback on:
- CSV format requirements
- Validation rules
- Error messages
- Feature requests

---

**Last Updated**: December 1, 2025
**Version**: 1.0.0
**Feature**: CSV Import & Segment Generation
