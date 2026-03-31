import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  UserCheck, 
  Globe, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';

const Policies = () => {
  const sections = [
    {
      title: 'Terms of Service',
      icon: FileText,
      content: [
        {
          heading: '1. Acceptance of Terms',
          body: 'By accessing and using this Canteen Pre-Order System, you agree to be bound by these terms. If you do not agree, please refrain from using the platform.'
        },
        {
          heading: '2. User Accounts',
          body: 'You are responsible for maintaining the confidentiality of your account credentials. All activities under your account are your sole responsibility.'
        },
        {
          heading: '3. Order Placement',
          body: 'Orders placed through the system are final once confirmed. Cancellation policies apply as per the canteen administration rules.'
        },
        {
          heading: '4. Privacy Policy Agreement',
          body: 'Users acknowledge that their data is handled according to our Privacy Policy outlined below.'
        }
      ]
    },
    {
      title: 'Privacy Policy',
      icon: ShieldCheck,
      content: [
        {
          heading: '1. Data Collection',
          body: 'We collect your name, email, and order history to provide a personalized experience and manage your cafeteria pre-orders efficiently.'
        },
        {
          heading: '2. Data Usage',
          body: 'Your data is strictly used for order processing, system notifications, and internal analytics to improve service quality.'
        },
        {
          heading: '3. Data Security',
          body: 'We implement industry-standard security measures (SSL, RSA) to protect your information from unauthorized access or disclosure.'
        },
        {
          heading: '4. Third-Party Access',
          body: 'We do not sell or share your personal data with third-party marketing agencies. Data is only shared with authorized canteen staff for order fulfillment.'
        }
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-20"
    >
      <div className="flex flex-col items-center text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          <ShieldCheck className="h-4 w-4" />
          System Governance
        </div>
        <h2 className="text-6xl font-black tracking-tighter uppercase mb-6">
          OFFICIAL <span className="text-indigo-600 glow-text">POLICIES</span>
        </h2>
        <p className="text-[var(--text-secondary)] font-medium max-w-xl mx-auto leading-relaxed">
          The legal framework governing your interactions with our digital canteen platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {sections.map((section, index) => (
          <motion.div 
            key={section.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="cyber-card p-12 bg-[var(--card-bg)] border-2 border-[var(--border-color)] relative cyber-corners"
          >
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-[var(--border-color)]">
               <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <section.icon className="h-6 w-6 text-indigo-500" />
               </div>
               <h3 className="text-3xl font-black uppercase tracking-tighter">{section.title}</h3>
            </div>
            
            <div className="space-y-10">
               {section.content.map((item, i) => (
                 <div key={i} className="space-y-3">
                    <h5 className="font-black text-indigo-500 text-xs uppercase tracking-widest flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                       {item.heading}
                    </h5>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
                       {item.body}
                    </p>
                 </div>
               ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-[var(--border-color)] flex items-center justify-between opacity-30">
               <span className="text-[8px] font-black uppercase tracking-widest italic">Last Update: March 2026</span>
               <span className="text-[8px] font-black uppercase tracking-widest italic">Document: POL_v{index + 1}.0</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-20 p-10 bg-indigo-500/5 border border-indigo-500/10 rounded-[3rem] text-center max-w-4xl mx-auto">
         <div className="flex items-center justify-center gap-4 mb-4">
            <AlertCircle className="h-5 w-5 text-indigo-500" />
            <h4 className="text-xl font-black uppercase tracking-tighter">Have any questions?</h4>
         </div>
         <p className="text-xs text-[var(--text-secondary)] font-medium mb-8">If you have any queries regarding our terms and policies, please reach out to the support center.</p>
         <motion.button 
           whileHover={{ scale: 1.05 }}
           className="px-10 py-4 bg-indigo-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-xl shadow-indigo-600/20"
         >
           Contact Legal Dept
         </motion.button>
      </div>
    </motion.div>
  );
};

export default Policies;
