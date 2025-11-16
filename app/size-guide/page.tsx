export default function SizeGuidePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)'}}></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)'}}></div>
        </div>
        
        <div className="container-custom relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md border mb-6" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
            <span className="text-sm font-medium" style={{color: 'var(--color-accent)'}}>📏 Find Your Perfect Fit</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Size Guide
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Measure yourself accurately for the perfect fit
          </p>
        </div>
      </section>

      <div className="pb-12">
        <div className="container-custom max-w-6xl">
          
          {/* How to Measure */}
          <div className="mb-12 p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
            <h2 className="text-3xl font-bold mb-6 text-center" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              How to Measure
            </h2>
            <div className="grid md:grid-cols-3 gap-6" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl" style={{backgroundColor: 'rgba(255, 0, 127, 0.2)'}}>
                  👚
                </div>
                <h3 className="font-bold mb-2" style={{color: 'white'}}>Bust</h3>
                <p className="text-sm">Measure around the fullest part of your bust, keeping the tape parallel to the floor</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl" style={{backgroundColor: 'rgba(212, 175, 55, 0.2)'}}>
                  ⚖️
                </div>
                <h3 className="font-bold mb-2" style={{color: 'white'}}>Underbust</h3>
                <p className="text-sm">Measure directly under your bust where the band of a bra would sit</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl" style={{backgroundColor: 'rgba(255, 0, 127, 0.2)'}}>
                  📐
                </div>
                <h3 className="font-bold mb-2" style={{color: 'white'}}>Hips</h3>
                <p className="text-sm">Measure around the fullest part of your hips, about 8 inches below your waist</p>
              </div>
            </div>
          </div>

          {/* Bra Size Chart */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Bra Size Chart
            </h2>
            <div className="overflow-x-auto rounded-2xl border" style={{borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <table className="w-full">
                <thead style={{backgroundColor: 'rgba(255, 0, 127, 0.2)'}}>
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold" style={{color: 'white'}}>Size</th>
                    <th className="px-6 py-4 text-left font-semibold" style={{color: 'white'}}>Underbust (inches)</th>
                    <th className="px-6 py-4 text-left font-semibold" style={{color: 'white'}}>Bust (inches)</th>
                    <th className="px-6 py-4 text-left font-semibold" style={{color: 'white'}}>Cup Size</th>
                  </tr>
                </thead>
                <tbody style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>32A</td>
                    <td className="px-6 py-4">28-30</td>
                    <td className="px-6 py-4">32-33</td>
                    <td className="px-6 py-4">A</td>
                  </tr>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>32B</td>
                    <td className="px-6 py-4">28-30</td>
                    <td className="px-6 py-4">33-34</td>
                    <td className="px-6 py-4">B</td>
                  </tr>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>34A</td>
                    <td className="px-6 py-4">30-32</td>
                    <td className="px-6 py-4">34-35</td>
                    <td className="px-6 py-4">A</td>
                  </tr>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>34B</td>
                    <td className="px-6 py-4">30-32</td>
                    <td className="px-6 py-4">35-36</td>
                    <td className="px-6 py-4">B</td>
                  </tr>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>34C</td>
                    <td className="px-6 py-4">30-32</td>
                    <td className="px-6 py-4">36-37</td>
                    <td className="px-6 py-4">C</td>
                  </tr>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>36B</td>
                    <td className="px-6 py-4">32-34</td>
                    <td className="px-6 py-4">37-38</td>
                    <td className="px-6 py-4">B</td>
                  </tr>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>36C</td>
                    <td className="px-6 py-4">32-34</td>
                    <td className="px-6 py-4">38-39</td>
                    <td className="px-6 py-4">C</td>
                  </tr>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>38C</td>
                    <td className="px-6 py-4">34-36</td>
                    <td className="px-6 py-4">40-41</td>
                    <td className="px-6 py-4">C</td>
                  </tr>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>40C</td>
                    <td className="px-6 py-4">36-38</td>
                    <td className="px-6 py-4">42-43</td>
                    <td className="px-6 py-4">C</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Panty Size Chart */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Panty Size Chart
            </h2>
            <div className="overflow-x-auto rounded-2xl border" style={{borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <table className="w-full">
                <thead style={{backgroundColor: 'rgba(212, 175, 55, 0.2)'}}>
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold" style={{color: 'white'}}>Size</th>
                    <th className="px-6 py-4 text-left font-semibold" style={{color: 'white'}}>Waist (inches)</th>
                    <th className="px-6 py-4 text-left font-semibold" style={{color: 'white'}}>Hips (inches)</th>
                  </tr>
                </thead>
                <tbody style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>XS</td>
                    <td className="px-6 py-4">24-26</td>
                    <td className="px-6 py-4">34-36</td>
                  </tr>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>S</td>
                    <td className="px-6 py-4">26-28</td>
                    <td className="px-6 py-4">36-38</td>
                  </tr>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>M</td>
                    <td className="px-6 py-4">28-30</td>
                    <td className="px-6 py-4">38-40</td>
                  </tr>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>L</td>
                    <td className="px-6 py-4">30-32</td>
                    <td className="px-6 py-4">40-42</td>
                  </tr>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>XL</td>
                    <td className="px-6 py-4">32-34</td>
                    <td className="px-6 py-4">42-44</td>
                  </tr>
                  <tr className="border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <td className="px-6 py-4 font-semibold" style={{color: 'var(--color-accent)'}}>XXL</td>
                    <td className="px-6 py-4">34-36</td>
                    <td className="px-6 py-4">44-46</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips */}
          <div className="p-8 rounded-2xl border" style={{backgroundColor: 'rgba(255, 0, 127, 0.1)', borderColor: 'var(--color-primary)'}}>
            <h3 className="text-2xl font-bold mb-4 text-center" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Fitting Tips
            </h3>
            <ul className="space-y-3" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              <li>✓ Measure yourself without clothes for accuracy</li>
              <li>✓ Use a soft measuring tape and keep it parallel to the floor</li>
              <li>✓ Don't pull the tape too tight - it should be snug but comfortable</li>
              <li>✓ If you're between sizes, we recommend sizing up for comfort</li>
              <li>✓ Still unsure? Contact us for personalized sizing help</li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}
