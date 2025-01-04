import Image from 'next/image';

const Testimonials = () => {
  return (
    <div className="my-4 font-[sans-serif]">
      <div className="max-w-[1050px] max-md:max-w-xl mx-auto">
        <div className="grid md:grid-cols-2 items-center lg:gap-24 md:gap-16 gap-8">
          <div className="space-y-6 bg-blue-50 rounded-lg p-6">
            {/* Testimonial 1 */}
            <div className="flex sm:items-center max-sm:flex-col-reverse">
              <div className="mr-3">
                <h4 className="text-gray-800 text-base font-bold">John Doe</h4>
                <p className="text-sm text-gray-500 mt-2">
                  Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit.
                </p>
              </div>
              <Image
                src="https://readymadeui.com/profile_2.webp"
                alt="John Doe"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full max-sm:mb-2"
              />
            </div>

            {/* Testimonial 2 */}
            <div className="flex sm:items-center max-sm:flex-col-reverse p-6 relative md:left-12 bg-white shadow-[0_2px_20px_-4px_rgba(93,96,127,0.2)] rounded-lg">
              <div className="mr-3">
                <h4 className="text-gray-800 text-base font-bold">Mark Adair</h4>
                <p className="text-sm text-gray-500 mt-2">
                  Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit.
                </p>
              </div>
              <Image
                src="https://readymadeui.com/profile_3.webp"
                alt="Mark Adair"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full max-sm:mb-2"
              />
            </div>

            {/* Testimonial 3 */}
            <div className="flex sm:items-center max-sm:flex-col-reverse">
              <div className="mr-3">
                <h4 className="text-gray-800 text-base font-bold">Simon Konecki</h4>
                <p className="text-sm text-gray-500 mt-2">
                  Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit.
                </p>
              </div>
              <Image
                src="https://readymadeui.com/profile_4.webp"
                alt="Simon Konecki"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full max-sm:mb-2"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="max-md:-order-1">
            <h6 className="text-xl font-bold text-gray-200">Testimonials</h6>
            <h2 className="text-gray-800 text-4xl font-extrabold mt-4">
              We are loyal with our customer
            </h2>
            <p className="text-sm text-gray-500 mt-4 leading-relaxed">
              Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit. Elit occaecat officia et laboris Lorem minim. Officia do aliqua adipisicing ullamco in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
