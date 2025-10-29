export default function TopAccessories() {
  return (
    <section className="px-4 sm:px-8 lg:px-10 py-10">
      <div className="text-center mb-10">
        <h2 className="text-gray-900  text-3xl font-bold leading-tight tracking-[-0.015em]">Top Accessories</h2>
        <p className="text-gray-600 mt-2">Elevate your experience with essential add-ons.</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
        {[{
          title: 'AirPods Pro (2nd Gen)', price: '$249.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbr8T6gjc7Ft2NHBOPujLVWuTiMxndJ5yqJfilwgLaIDCAznNx0s2PbDHieXQPxrgYKXYPkruO4AEwt_LwHDqm6Z7MXxFes1v_Kk7LPdrxQ-ZYh4OcM9gHUfa9cGok2vjwgD0mwDTgivlNShgPegE0KwkN9A2TogxhrR-kw3SN8WgRybNovKncLp1pOHo_UglEEelnLE2HGBkUFV0oX6yhq8r6YyVbFv1q8thU9MSMBCsIvc6hMz0LGHfC2IwxTSc3iq9ZX3cvKT0y'
        },{
          title: 'Samsung Galaxy Watch6', price: '$299.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ9aq-bO6MyfeXwH8imafNWiBAeR3qsUMIXe7QUZJyy5Au9rZscQqQoUjKkdGLxjuaLHlD_jA-P9PYuokUS5ZKcXy_aKLQOVNseqyNq8cPZX0VHdjvPcRDbjoZGzJnkoM3mq6YcY2KIOdiAqIRYtOXVsImssXZyVwQTq9Wquy75L9H2ggTo7BhhoeXyySxcUBjyWSdZqzORVeVKyonD-VBpMY4lzMG8o2ZfY4u4vT6Ouk0udgrKXXFRimKQ727rDJJ57liP2hIrOTX'
        },{
          title: 'Anker Power Bank', price: '$59.99', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLBMAX_0aWt8-kS5Sqfj_k9uKTizAOxDIOkjck0LjpyCXM0DXY_fnuiUAFMRgeQ2rgE0gQIFn4hTKieiXNvJU5WG85AlcaQwmV6uBrrUMvw2lDdd9ySr3nJaIfKLNA5jx-Bm2RHyx5MbLBgqL_H4vM5qt5IvYip0-7wd02MekddwyIiIlaACcMvRcUTWdSr11-yNJWaQ3QNA4XgPYsg0NlzoPZdb2t3QF-XML4IT2l4A151p9ClFcSZvQH4xPdtOB1ULCBMTi0mGLL'
        },{
          title: 'Spigen Tough Armor Case', price: '$35.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtzw44DcUTgDKrS1TykHUoM6kcO-lW4nLELKXteN6YjvqWr_6z5i6wYFBELc8y-im6xwpf-RzLTTymRvqxUwL3SV_x_rlRaoh3iyu3jg4gLK9HvnL0Xy2c8_punkuKTH-k1QyQd6aiOZyh3IkcPjJL17BTVsKTl3_jeXo8CfFwK6rwugx6jVK-29DPSfKNpIQ_WJFhBd-aIDIZn24Rb-XFgKVhxW0Fu7DQlFHMMb3VZhlZYgObeH0AgfwzPzgl-Q0ckcAsrHjbjGjJ'
        }].map((p) => (
          <div key={p.title} className="flex flex-col gap-3 pb-3 group text-center">
            <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
              <img alt={p.title} src={p.img} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 aspect-square" />
            </div>
            <div>
              <p className="text-base font-medium leading-normal text-gray-900">{p.title}</p>
              <p className="text-sm font-normal leading-normal text-gray-600">{p.price}</p>
              <a href="#" className="text-sm font-bold leading-normal text-primary hover:underline">Add to Cart</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


