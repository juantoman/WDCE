import Image from 'next/image';
import {
  Customer
} from '@/app/lib/definitions';

// Un componente que muestra la información de una carta de juego
export default function LittleCard({
  customer
}: {
  customer: Customer;
}) {
  return (
    <div className="flex justify-center">
        <div className="w-48 h-48 p-8 bg-white rounded-xl shadow hover:shadow-lg duration-300 hover:scale-105">
            {/* <Image className="h-20 w-20 mx-auto rounded-full ring-4 ring-yellow-700" src="https://cdn.dribbble.com/users/3349322/screenshots/14039201/media/616e4ae6995fb288e434c3f0927541ce.png" alt="User Image" /> */}
            <Image
              src={customer.image_url}
              className="mx-auto rounded-full ring-1 ring-blue-100"
              alt={`${customer.name}'s profile picture`}
              width={80}
              height={80}
            />
            <div className="text-center py-4">
                {/* <div className="py-4">
                    <p className="text-lg text-black font-semibold">A Tailwind Card</p>
                    <p className="text-gray-700">Learn with fun</p>
                </div> */}
                <button className="border h-10 w-32 border-blue-100 bg-blue-50 px-4 py-1 rounded-full text-yellow-900 overflow-auto truncate text-blue-400">{customer.name}</button>
            </div>
        </div>
    </div>
  );
}

