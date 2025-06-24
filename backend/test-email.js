const EmailService = require("./emails/emailService");

async function testEmailFunctionality() {
  console.log("Testing email functionality...\n");

  try {
    // Test 1: Test email connection
    console.log("1. Testing email connection...");
    const connectionResult = await EmailService.testConnection();
    console.log("✅ Connection test result:", connectionResult);

    // Test 2: Send welcome email
    console.log("\n2. Testing welcome email...");
    const welcomeResult = await EmailService.sendWelcomeEmail(
      "John Doe",
      "test@example.com"
    );
    console.log("✅ Welcome email result:", welcomeResult);

    // Test 3: Send record created email
    console.log("\n3. Testing record created email...");
    const recordData = {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      birthDate: "1990-05-15",
    };
    const recordResult = await EmailService.sendRecordCreatedEmail(recordData);
    console.log("✅ Record created email result:", recordResult);

    console.log("\n🎉 All email tests completed successfully!");
  } catch (error) {
    console.error("❌ Email test failed:", error.message);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testEmailFunctionality();
}

module.exports = testEmailFunctionality;
