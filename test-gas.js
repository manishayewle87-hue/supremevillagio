const url = "https://script.google.com/macros/s/AKfycbwKPSo6EIza30iuD-nMQfcRMLKUDbolQaQkZWk6VCR0KHYXQ54YWCJC2ZcnYX0kCzcJyg/exec";

async function test() {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: "Final Test",
        phone: "7777777777",
        email: "testfinal@example.com",
        typology: "Row House"
      })
    });

    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch(e) {
    console.error(e);
  }
}

test();
