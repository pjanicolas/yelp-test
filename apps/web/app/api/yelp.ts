export async function getRestaurantsByCity(city: string) {
  try {
      const domain: string = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${domain}/yelp?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
}
