const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// MongoDB connection string - update with your actual connection string
const uri = "mongodb://127.0.0.1:27017"; 
const client = new MongoClient(uri);

// Template files to backup
const templateFiles = [
  {
    name: 'template1',
    path: path.join(__dirname, '..', 'frontend', 'src', 'components', 'resume', 'templates', 'template1.js'),
    label: 'Professional'
  },
  {
    name: 'template2',
    path: path.join(__dirname, '..', 'frontend', 'src', 'components', 'resume', 'templates', 'template2.js'),
    label: 'Modern Professional'
  },
  {
    name: 'template3',
    path: path.join(__dirname, '..', 'frontend', 'src', 'components', 'resume', 'templates', 'template3.js'),
    label: 'Compact Elegance'
  }
];

async function storeTemplates() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");
    
    // Get database and collection
    const database = client.db("resume-builder"); // Change to your DB name
    const collection = database.collection("Templates");
    
    // Process each template file
    for (const template of templateFiles) {
      // Read file content
      const fileContent = fs.readFileSync(template.path, 'utf8');
      
      // Create document
      const templateDoc = {
        name: template.name,
        label: template.label,
        content: fileContent,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Insert into collection (upsert to update if exists)
      await collection.updateOne(
        { name: template.name },
        { $set: templateDoc },
        { upsert: true }
      );
      
      console.log(`Stored template: ${template.name}`);
    }
    
    console.log("All templates stored successfully!");
  } catch (err) {
    console.error("Error storing templates:", err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

// Run the function
storeTemplates();