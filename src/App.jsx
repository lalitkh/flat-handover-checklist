import { useState, useEffect, useRef } from "react";

const CHECKLIST_DATA = [
  {"sl":1,"room":"Drawing Room","desc":"Main Door - Polish & Finish","expected":"Smooth finish, no scratches, uniform gloss"},
  {"sl":2,"room":"Drawing Room","desc":"Main Door - Surface Scratches","expected":"No visible scratches or marks. Inspect under different lighting"},
  {"sl":3,"room":"Drawing Room","desc":"Main Door - Frame & Wall Gap","expected":"Max 2mm gap, uniform on all sides. Check with 2mm gauge"},
  {"sl":4,"room":"Drawing Room","desc":"Main Door - Locks & Latches","expected":"Smooth operation, no grinding, secure locking. Test 5+ cycles"},
  {"sl":5,"room":"Drawing Room","desc":"Main Door - Open/Close Smoothness","expected":"Smooth hinges, no friction, 90° opening. Check all hinges"},
  {"sl":6,"room":"Drawing Room","desc":"Paint - Double Coat Application","expected":"Even coating, no patchy areas, correct color"},
  {"sl":7,"room":"Drawing Room","desc":"Tiles - Breakage/Missing","expected":"No broken, chipped, or missing tiles. Full coverage inspection"},
  {"sl":8,"room":"Drawing Room","desc":"Tile Fixing - Gaps/Hollowness","expected":"No hollow sound, all tiles firmly fixed. Tap test each tile"},
  {"sl":9,"room":"Drawing Room","desc":"Tiles - Cement Gaps","expected":"Uniform grouting, max 3mm gap. Check color uniformity"},
  {"sl":10,"room":"Drawing Room","desc":"Tiles - Evenness/Level","expected":"Flush surface, no lippage (max 1mm difference). Use level tool"},
  {"sl":11,"room":"Drawing Room","desc":"Plug Points - Functionality","expected":"All outlets functional, earthing proper. Test with multimeter"},
  {"sl":12,"room":"Drawing Room","desc":"MCB Panel - Switch Function","expected":"All switches toggle smoothly, no loose connections. Test each circuit"},
  {"sl":13,"room":"Drawing Room","desc":"Sliding Door - Smoothness","expected":"Smooth gliding, no grinding, aligned properly. Test 10+ cycles"},
  {"sl":14,"room":"Drawing Room","desc":"Sliding Door - Frame - Scratches/Paint","expected":"Clean finish, no paint drips, uniform color"},
  {"sl":15,"room":"Drawing Room","desc":"Sliding Door - Frame - Wall Gaps","expected":"Max 2mm gap, no cracks around frame. Check all corners"},
  {"sl":16,"room":"Drawing Room","desc":"Sliding Door - Glass - Cracks/Defects","expected":"No cracks, chips, or scratches on glass. Check against light"},
  {"sl":17,"room":"Drawing Room","desc":"Sliding Door - Lock Mechanism","expected":"Smooth locking/unlocking, secure hold. Test locking action"},
  {"sl":18,"room":"Drawing Room","desc":"Balcony Floor – Tiles/Railing","expected":"Tiles intact, correct slope outwards, railing firm & rust‑free, shake railing gently"},
  {"sl":19,"room":"Drawing Room","desc":"Balcony Drain – Water Flow","expected":"No choking; water drains within 2–3 minutes, Pour bucket of water and observe flow"},
  {"sl":20,"room":"Kitchen","desc":"Tiles - Breakage/Missing","expected":"No broken, chipped, or missing tiles. Full coverage inspection"},
  {"sl":21,"room":"Kitchen","desc":"Tiles - Gaps/Hollowness","expected":"No hollow sound, all tiles firmly fixed. Tap test on all surfaces"},
  {"sl":22,"room":"Kitchen","desc":"Tiles - Cement Gaps","expected":"Uniform grouting, max 3mm gap, even color. Check color uniformity"},
  {"sl":23,"room":"Kitchen","desc":"Paint - Double Coat","expected":"Even coating, no patchy areas, correct color. Inspect all walls"},
  {"sl":24,"room":"Kitchen","desc":"Plug Points - Functionality","expected":"All outlets functional, earthing proper. Test with multimeter"},
  {"sl":25,"room":"Kitchen","desc":"Water Flow - Sink/Washing Area","expected":"Good water pressure, no fluctuation. Check for 2 minutes"},
  {"sl":26,"room":"Kitchen","desc":"Utility Door - Scratches/Paint Issues","expected":"Clean finish, no paint drips. Check glass and frame"},
  {"sl":27,"room":"Kitchen","desc":"Utility Door - Smoothness","expected":"Smooth operation, no sticking. Test open/close multiple times"},
  {"sl":28,"room":"Kitchen","desc":"Utility Door - Locks","expected":"Smooth locking/unlocking, secure hold. Test lock mechanism"},
  {"sl":29,"room":"Kitchen","desc":"Utility Door - Glass Condition","expected":"No cracks, chips, or scratches. Check against light"},
  {"sl":30,"room":"Kitchen","desc":"Utility Floor – Tiles/Railing","expected":"Tiles intact, correct slope outwards, railing firm & rust‑free, shake railing gently"},
  {"sl":31,"room":"Kitchen","desc":"Utility Drain – Water Flow","expected":"No choking; water drains within 2–3 minutes, Pour bucket of water and observe flow"},
  {"sl":32,"room":"Kitchen","desc":"Utility External Wall – Paint and Cracks","expected":"Even coating, no patchy areas, correct color. Inspect all walls"},
  {"sl":33,"room":"Kitchen","desc":"Sink - Fixing & Stability","expected":"Firm fixing, no movement or flexing. Apply downward pressure"},
  {"sl":34,"room":"Kitchen","desc":"Sink - Cement Gaps","expected":"No gaps around edges, proper sealing. Check all edges"},
  {"sl":35,"room":"Kitchen","desc":"Sink - Leakage Test","expected":"No leaks after 5-minute water run. Fill sink completely"},
  {"sl":36,"room":"Kitchen","desc":"Sink - Drain Blockage","expected":"Free flow of water, no blockage. Pour water at full pressure"},
  {"sl":37,"room":"Master Bedroom","desc":"Door - Scratches/Paint","expected":"Clean finish, no paint drips or marks. Inspect entire door surface"},
  {"sl":38,"room":"Master Bedroom","desc":"Door - Gap/Alignment","expected":"Max 3mm gap, door aligned properly. Check all sides"},
  {"sl":39,"room":"Master Bedroom","desc":"Ceiling - Paint/Double Coat","expected":"Even coating, no patchy areas, correct color. Inspect entire ceiling"},
  {"sl":40,"room":"Master Bedroom","desc":"Paint - Double Coat Application","expected":"Even coating, no patchy areas, correct color"},
  {"sl":41,"room":"Master Bedroom","desc":"Balcony Door - Smoothness/Open-Close","expected":"Smooth operation, glides without resistance. Test 10+ times"},
  {"sl":42,"room":"Master Bedroom","desc":"Balcony Door - Locks","expected":"Smooth locking/unlocking, secure hold. Test lock mechanism"},
  {"sl":43,"room":"Master Bedroom","desc":"Balcony Door Frame - Scratches/Bend","expected":"No scratches, uniform color, no bending. Inspect all frame edges"},
  {"sl":44,"room":"Master Bedroom","desc":"Balcony Door Glass - Cracks/Defects","expected":"No cracks, chips, or scratches. Check against light"},
  {"sl":45,"room":"Master Bedroom","desc":"Balcony Floor – Tiles/Railing","expected":"Tiles intact, correct slope outwards, railing firm & rust‑free, shake railing gently"},
  {"sl":46,"room":"Master Bedroom","desc":"Balcony Drain – Water Flow","expected":"No choking; water drains within 2–3 minutes, Pour bucket of water and observe flow"},
  {"sl":47,"room":"Master Bathroom","desc":"Tiles - Breakage/Missing","expected":"No broken, chipped, or missing tiles. Full coverage inspection"},
  {"sl":48,"room":"Master Bathroom","desc":"Tiles - Evenness/Level","expected":"Flush surface, no lippage (max 1mm difference). Use level tool"},
  {"sl":49,"room":"Master Bathroom","desc":"Tiles - Cement Gaps","expected":"Uniform grouting, max 3mm gap. Check color uniformity"},
  {"sl":50,"room":"Master Bathroom","desc":"Wash Basin - Fixing & Stability","expected":"Firm fixing, no movement or flexing. Apply pressure test"},
  {"sl":51,"room":"Master Bathroom","desc":"Wash Basin - Leakage Test","expected":"No leaks from pipes or connections. Run water for 3 minutes"},
  {"sl":52,"room":"Master Bathroom","desc":"Wash Basin - Blockage","expected":"Free water flow, no blockage. Test drain with full water"},
  {"sl":53,"room":"Master Bathroom","desc":"Granite - Fixing & Stability","expected":"Firm fixing, no movement, no cracks. Check all connection points"},
  {"sl":54,"room":"Master Bathroom","desc":"Commode - Fixing","expected":"Firm fixing to floor, no movement. Apply pressure test"},
  {"sl":55,"room":"Master Bathroom","desc":"Commode - Blockage","expected":"Free flow, no blockage, smooth operation. Test flush mechanism"},
  {"sl":56,"room":"Master Bathroom","desc":"Commode - Leakage","expected":"No leaks at base or connections. Check after multiple flushes"},
  {"sl":57,"room":"Master Bathroom","desc":"Commode - Scratches/Condition","expected":"Clean, no cracks or scratches on porcelain. Visual inspection"},
  {"sl":58,"room":"Master Bathroom","desc":"Bathroom - Slope/Drainage","expected":"Proper slope for drainage, no water pooling. Check with water test"},
  {"sl":59,"room":"Master Bathroom","desc":"Bathroom - Leaks/Dampness","expected":"No seepage, no damp spots on walls/ceiling. Check all corners"},
  {"sl":60,"room":"Master Bathroom","desc":"Bathroom - False Ceiling","expected":"Proper fixing, no sagging or damage. Check alignment"},
  {"sl":61,"room":"Master Bathroom","desc":"Bathroom - Light Fixture","expected":"Functional, proper brightness, no flickering. Test ON/OFF"},
  {"sl":62,"room":"Master Bathroom","desc":"Ventilation - Exhaust Fan","expected":"Functional, proper suction, quiet operation. Test for 2 minutes"},
  {"sl":63,"room":"Master Bathroom","desc":"Geyser - Leakage","expected":"No leaks at connections or tank. Inspect for 5 minutes"},
  {"sl":64,"room":"Master Bathroom","desc":"Geyser - Working Condition","expected":"Heats water within 3-5 minutes. Test temperature"},
  {"sl":65,"room":"Master Bathroom","desc":"Geyser - Switch/Control","expected":"Switch works smoothly, thermostat functions. Test heating control"},
  {"sl":66,"room":"Master Bathroom","desc":"Bathroom - Overall Cleanliness","expected":"Clean, no debris or loose material. Final visual check"},
  {"sl":67,"room":"Master Bathroom","desc":"Bathroom - Taps/Faucets","expected":"All taps functional, smooth operation, no leaks. Test all taps"},
  {"sl":68,"room":"Master Bathroom","desc":"Bathroom Door - Lock/Condition","expected":"Smooth operation, secure lock, no damage. Test lock mechanism"},
  {"sl":69,"room":"Guest Bedroom","desc":"Door - Scratches/Paint","expected":"Clean finish, no paint drips or marks. Inspect entire door surface"},
  {"sl":70,"room":"Guest Bedroom","desc":"Door - Gap/Alignment","expected":"Max 3mm gap, door aligned properly. Check all sides"},
  {"sl":71,"room":"Guest Bedroom","desc":"Ceiling - Paint/Double Coat","expected":"Even coating, no patchy areas, correct color. Inspect entire ceiling"},
  {"sl":72,"room":"Guest Bedroom","desc":"Paint - Double Coat Application","expected":"Even coating, no patchy areas, correct color"},
  {"sl":73,"room":"Guest Bedroom","desc":"Window - Smoothness/Open-Close","expected":"Smooth operation, glides without resistance. Test 10+ times"},
  {"sl":74,"room":"Guest Bedroom","desc":"Window - Locks","expected":"Smooth locking/unlocking, secure hold. Test lock mechanism"},
  {"sl":75,"room":"Guest Bedroom","desc":"Window Frame - Scratches/Bend/Paint","expected":"No scratches, uniform color, no bending. Inspect all frame edges"},
  {"sl":76,"room":"Guest Bedroom","desc":"Window Glass - Cracks/Defects","expected":"No cracks, chips, or scratches. Check against light"},
  {"sl":77,"room":"Guest Bathroom","desc":"Tiles - Breakage/Missing","expected":"No broken, chipped, or missing tiles. Full coverage inspection"},
  {"sl":78,"room":"Guest Bathroom","desc":"Tiles - Evenness/Level","expected":"Flush surface, no lippage (max 1mm difference). Use level tool"},
  {"sl":79,"room":"Guest Bathroom","desc":"Tiles - Cement Gaps","expected":"Uniform grouting, max 3mm gap. Check color uniformity"},
  {"sl":80,"room":"Guest Bathroom","desc":"Wash Basin - Fixing & Stability","expected":"Firm fixing, no movement or flexing. Apply pressure test"},
  {"sl":81,"room":"Guest Bathroom","desc":"Wash Basin - Leakage Test","expected":"No leaks from pipes or connections. Run water for 3 minutes"},
  {"sl":82,"room":"Guest Bathroom","desc":"Wash Basin - Blockage","expected":"Free water flow, no blockage. Test drain with full water"},
  {"sl":83,"room":"Guest Bathroom","desc":"Granite - Fixing & Stability","expected":"Firm fixing, no movement, no cracks. Check all connection points"},
  {"sl":84,"room":"Guest Bathroom","desc":"Commode - Fixing","expected":"Firm fixing to floor, no movement. Apply pressure test"},
  {"sl":85,"room":"Guest Bathroom","desc":"Commode - Blockage","expected":"Free flow, no blockage, smooth operation. Test flush mechanism"},
  {"sl":86,"room":"Guest Bathroom","desc":"Commode - Leakage","expected":"No leaks at base or connections. Check after multiple flushes"},
  {"sl":87,"room":"Guest Bathroom","desc":"Commode - Scratches/Condition","expected":"Clean, no cracks or scratches on porcelain. Visual inspection"},
  {"sl":88,"room":"Guest Bathroom","desc":"Bathroom - Slope/Drainage","expected":"Proper slope for drainage, no water pooling. Check with water test"},
  {"sl":89,"room":"Guest Bathroom","desc":"Bathroom - Leaks/Dampness","expected":"No seepage, no damp spots on walls/ceiling. Check all corners"},
  {"sl":90,"room":"Guest Bathroom","desc":"Bathroom - False Ceiling","expected":"Proper fixing, no sagging or damage. Check alignment"},
  {"sl":91,"room":"Guest Bathroom","desc":"Bathroom - Light Fixture","expected":"Functional, proper brightness, no flickering. Test ON/OFF"},
  {"sl":92,"room":"Guest Bathroom","desc":"Mirror - Fixing & Condition","expected":"Firm fixing, no cracks or spots. Visual inspection"},
  {"sl":93,"room":"Guest Bathroom","desc":"Ventilation - Exhaust Fan","expected":"Functional, proper suction, quiet operation. Test for 2 minutes"},
  {"sl":94,"room":"Guest Bathroom","desc":"Geyser - Leakage","expected":"No leaks at connections or tank. Inspect for 5 minutes"},
  {"sl":95,"room":"Guest Bathroom","desc":"Geyser - Working Condition","expected":"Heats water within 3-5 minutes. Test temperature"},
  {"sl":96,"room":"Guest Bathroom","desc":"Geyser - Switch/Control","expected":"Switch works smoothly, thermostat functions. Test heating control"},
  {"sl":97,"room":"Guest Bathroom","desc":"Bathroom - Overall Cleanliness","expected":"Clean, no debris or loose material. Final visual check"},
  {"sl":98,"room":"Guest Bathroom","desc":"Bathroom - Taps/Faucets","expected":"All taps functional, smooth operation, no leaks. Test all taps"},
  {"sl":99,"room":"Guest Bathroom","desc":"Bathroom Door - Lock/Condition","expected":"Smooth operation, secure lock, no damage. Test lock mechanism"},
  {"sl":100,"room":"Kids Room","desc":"Door - Scratches/Paint","expected":"Clean finish, no paint drips or marks. Inspect entire door surface"},
  {"sl":101,"room":"Kids Room","desc":"Door - Gap/Alignment","expected":"Max 3mm gap, door aligned properly. Check all sides"},
  {"sl":102,"room":"Kids Room","desc":"Window - Smoothness/Open-Close","expected":"Smooth operation, glides without resistance. Test 10+ times"},
  {"sl":103,"room":"Kids Room","desc":"Window - Locks","expected":"Smooth locking/unlocking, secure hold. Test lock mechanism"},
  {"sl":104,"room":"Kids Room","desc":"Window Frame - Scratches/Bend/Paint","expected":"No scratches, uniform color, no bending. Inspect all frame edges"},
  {"sl":105,"room":"Kids Room","desc":"Window Glass - Cracks/Defects","expected":"No cracks, chips, or scratches. Check against light"},
  {"sl":106,"room":"Kids Room","desc":"Paint - Double Coat Application","expected":"Even coating, no patchy areas, correct color"},
  {"sl":107,"room":"Kids Room","desc":"Ceiling - Paint/Double Coat","expected":"Even coating, no patchy areas, correct color. Inspect entire ceiling"},
  {"sl":108,"room":"Common Bathroom","desc":"Tiles - Breakage/Missing","expected":"No broken, chipped, or missing tiles. Full coverage inspection"},
  {"sl":109,"room":"Common Bathroom","desc":"Tiles - Evenness/Level","expected":"Flush surface, no lippage (max 1mm difference). Use level tool"},
  {"sl":110,"room":"Common Bathroom","desc":"Tiles - Cement Gaps","expected":"Uniform grouting, max 3mm gap. Check color uniformity"},
  {"sl":111,"room":"Common Bathroom","desc":"Wash Basin - Fixing & Stability","expected":"Firm fixing, no movement or flexing. Apply pressure test"},
  {"sl":112,"room":"Common Bathroom","desc":"Wash Basin - Leakage Test","expected":"No leaks from pipes or connections. Run water for 3 minutes"},
  {"sl":113,"room":"Common Bathroom","desc":"Wash Basin - Blockage","expected":"Free water flow, no blockage. Test drain with full water"},
  {"sl":114,"room":"Common Bathroom","desc":"Granite - Fixing & Stability","expected":"Firm fixing, no movement, no cracks. Check all connection points"},
  {"sl":115,"room":"Common Bathroom","desc":"Commode - Fixing","expected":"Firm fixing to floor, no movement. Apply pressure test"},
  {"sl":116,"room":"Common Bathroom","desc":"Commode - Blockage","expected":"Free flow, no blockage, smooth operation. Test flush mechanism"},
  {"sl":117,"room":"Common Bathroom","desc":"Commode - Leakage","expected":"No leaks at base or connections. Check after multiple flushes"},
  {"sl":118,"room":"Common Bathroom","desc":"Commode - Scratches/Condition","expected":"Clean, no cracks or scratches on porcelain. Visual inspection"},
  {"sl":119,"room":"Common Bathroom","desc":"Bathroom - Slope/Drainage","expected":"Proper slope for drainage, no water pooling. Check with water test"},
  {"sl":120,"room":"Common Bathroom","desc":"Bathroom - Leaks/Dampness","expected":"No seepage, no damp spots on walls/ceiling. Check all corners"},
  {"sl":121,"room":"Common Bathroom","desc":"Bathroom - False Ceiling","expected":"Proper fixing, no sagging or damage. Check alignment"},
  {"sl":122,"room":"Common Bathroom","desc":"Bathroom - Light Fixture","expected":"Functional, proper brightness, no flickering. Test ON/OFF"},
  {"sl":123,"room":"Common Bathroom","desc":"Geyser - Leakage","expected":"No leaks at connections or tank. Inspect for 5 minutes"},
  {"sl":124,"room":"Common Bathroom","desc":"Geyser - Working Condition","expected":"Heats water within 3-5 minutes. Test temperature"},
  {"sl":125,"room":"Common Bathroom","desc":"Geyser - Switch/Control","expected":"Switch works smoothly, thermostat functions. Test heating control"},
  {"sl":126,"room":"Common Bathroom","desc":"Bathroom - Overall Cleanliness","expected":"Clean, no debris or loose material. Final visual check"},
  {"sl":127,"room":"Common Bathroom","desc":"Bathroom - Taps/Faucets","expected":"All taps functional, smooth operation, no leaks. Test all taps"},
  {"sl":128,"room":"General","desc":"Plaster Work - Around Switches","expected":"Smooth finish, no cracks, proper alignment. Inspect all switch boxes"},
  {"sl":129,"room":"General","desc":"Grouting of Tiles - Overall","expected":"Uniform color, no gaps or cracks. Check all tiled areas"},
  {"sl":130,"room":"General","desc":"Keys - Complete Set","expected":"All keys present and functional. Test each key in locks"},
  {"sl":131,"room":"General","desc":"Floors - General Cleanliness","expected":"Clean, no debris, dust-free. Thorough visual inspection"},
  {"sl":132,"room":"General","desc":"Skirting Tiles - Fixing","expected":"Firm fixing, no damage or gaps. Check all skirting edges"},
  {"sl":133,"room":"General","desc":"Hollow Spots - Tiles/Plaster","expected":"No hollow sounds when tapped. Tap test all areas"},
  {"sl":134,"room":"General","desc":"Door Stoppers - Functionality","expected":"All stoppers present and functional. Check all doors"},
  {"sl":135,"room":"General","desc":"Car Park/Common Area","expected":"Clean, proper markings, no damage. Visual inspection"},
  {"sl":136,"room":"Kids Bathroom","desc":"Tiles - Breakage/Missing","expected":"No broken, chipped, or missing tiles. Full coverage inspection"},
  {"sl":137,"room":"Kids Bathroom","desc":"Tiles - Evenness/Level","expected":"Flush surface, no lippage (max 1mm difference). Use level tool"},
  {"sl":138,"room":"Kids Bathroom","desc":"Wash Basin - Fixing & Stability","expected":"Firm fixing, no movement or flexing. Apply pressure test"},
  {"sl":139,"room":"Kids Bathroom","desc":"Commode - Fixing & Condition","expected":"Firm fixing to floor, no movement, no scratches. Apply pressure test"},
  {"sl":140,"room":"Kids Bathroom","desc":"Bathroom - Slope/Drainage","expected":"Proper slope for drainage, no water pooling. Check with water test"},
  {"sl":141,"room":"Kids Bathroom","desc":"Ventilation - Exhaust Fan","expected":"Functional, proper suction, quiet operation. Test for 2 minutes"},
  {"sl":142,"room":"Kids Bathroom","desc":"Geyser - Leakage & Condition","expected":"No leaks at connections or tank. Inspect for 5 minutes"},
  {"sl":143,"room":"Kids Bathroom","desc":"Bathroom - Taps/Faucets","expected":"All taps functional, smooth operation, no leaks. Test all taps"},
  {"sl":144,"room":"Maid Room","desc":"Door - Scratches/Paint","expected":"Clean finish, no paint drips or marks. Inspect entire door surface"},
  {"sl":145,"room":"Maid Room","desc":"Door - Gap/Alignment","expected":"Max 3mm gap, door aligned properly. Check all sides"},
  {"sl":146,"room":"Maid Room","desc":"Flooring - Tiles","expected":"No broken or chipped tiles, even surface. Full coverage inspection"},
  {"sl":147,"room":"Maid Room","desc":"Paint - Walls & Ceiling","expected":"Even coating, no patchy areas, correct color. Inspect all surfaces"},
  {"sl":148,"room":"Maid Room","desc":"Electrical - Switches & Sockets","expected":"All switches functional and secure. Test each switch"},
  {"sl":149,"room":"Maid Room","desc":"Ventilation / Window","expected":"Proper ventilation, window opens/closes smoothly. Test mechanism"},
  {"sl":150,"room":"Maid Bathroom","desc":"Tiles - Breakage/Missing","expected":"No broken, chipped, or missing tiles. Full coverage inspection"},
  {"sl":151,"room":"Maid Bathroom","desc":"Tiles - Evenness/Level","expected":"Flush surface, no lippage (max 1mm difference). Use level tool"},
  {"sl":152,"room":"Maid Bathroom","desc":"Wash Basin - Fixing & Stability","expected":"Firm fixing, no movement or flexing. Apply pressure test"},
  {"sl":153,"room":"Maid Bathroom","desc":"Commode - Fixing & Condition","expected":"Firm fixing to floor, no movement, no scratches. Apply pressure test"},
  {"sl":154,"room":"Maid Bathroom","desc":"Bathroom - Slope/Drainage","expected":"Proper slope for drainage, no water pooling. Check with water test"},
  {"sl":155,"room":"Maid Bathroom","desc":"Ventilation - Exhaust Fan","expected":"Functional, proper suction, quiet operation. Test for 2 minutes"},
  {"sl":156,"room":"Maid Bathroom","desc":"Geyser - Leakage & Condition","expected":"No leaks at connections or tank. Inspect for 5 minutes"},
  {"sl":157,"room":"Maid Bathroom","desc":"Bathroom - Taps/Faucets","expected":"All taps functional, smooth operation, no leaks. Test all taps"}
];

const ROOM_ICONS = {
  "Drawing Room": "🛋️",
  "Kitchen": "🍳",
  "Master Bedroom": "🛏️",
  "Master Bathroom": "🚿",
  "Guest Bedroom": "🛌",
  "Guest Bathroom": "🚰",
  "Kids Room": "🧒",
  "Kids Bathroom": "🛁",
  "Common Bathroom": "🚻",
  "Maid Room": "🧹",
  "Maid Bathroom": "🪣",
  "General": "🏠",
};

const ROOM_ORDER = [
  "Drawing Room", "Kitchen", "Master Bedroom", "Master Bathroom",
  "Guest Bedroom", "Guest Bathroom", "Kids Room", "Kids Bathroom",
  "Common Bathroom", "Maid Room", "Maid Bathroom", "General"
];

// Rooms that can be toggled on/off based on unit layout
const OPTIONAL_ROOMS = [
  "Guest Bedroom", "Guest Bathroom", "Kids Room", "Kids Bathroom",
  "Common Bathroom", "Maid Room", "Maid Bathroom"
];
// New rooms added — disabled by default until user opts in
const NEW_OPTIONAL_ROOMS = ["Kids Bathroom", "Maid Room", "Maid Bathroom"];
const DEFAULT_ENABLED_ROOMS = new Set(ROOM_ORDER.filter(r => !NEW_OPTIONAL_ROOMS.includes(r)));

function groupByRoom(data) {
  const grouped = {};
  data.forEach(item => {
    if (!grouped[item.room]) grouped[item.room] = [];
    grouped[item.room].push(item);
  });
  return grouped;
}

// ── Status Button Group ──
function StatusToggle({ value, onChange }) {
  const opts = [
    { key: "pass", label: "Pass", color: "#16a34a", bg: "#dcfce7", icon: "✓" },
    { key: "fail", label: "Fail", color: "#dc2626", bg: "#fee2e2", icon: "✗" },
    { key: "na", label: "N/A", color: "#71717a", bg: "#f4f4f5", icon: "—" },
  ];
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {opts.map(o => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            onClick={() => onChange(active ? null : o.key)}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: active ? `2px solid ${o.color}` : "2px solid #e5e7eb",
              background: active ? o.bg : "#fff",
              color: active ? o.color : "#a1a1aa",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              transition: "all 0.15s ease",
              display: "flex",
              alignItems: "center",
              gap: 4,
              letterSpacing: 0.3,
            }}
          >
            <span style={{ fontSize: 14 }}>{o.icon}</span>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Single Checklist Item Card ──
function CheckItem({ item, state, onUpdate, index }) {
  const [expanded, setExpanded] = useState(false);
  const statusColor =
    state.status === "pass" ? "#16a34a" :
    state.status === "fail" ? "#dc2626" :
    state.status === "na" ? "#71717a" : "#d4d4d8";

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        border: `1.5px solid ${state.status === "fail" ? "#fecaca" : state.status === "pass" ? "#bbf7d0" : "#f0f0f0"}`,
        padding: "16px 18px",
        marginBottom: 10,
        transition: "all 0.2s ease",
        boxShadow: state.status === "fail" ? "0 0 0 1px #fecaca" : "0 1px 3px rgba(0,0,0,0.04)",
        animation: `fadeSlideIn 0.3s ease ${index * 0.02}s both`,
      }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          cursor: "pointer",
        }}
      >
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: state.status ? (state.status === "pass" ? "#dcfce7" : state.status === "fail" ? "#fee2e2" : "#f4f4f5") : "#f8f8f8",
          border: `2px solid ${statusColor}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, marginTop: 1,
          fontSize: 13, fontWeight: 800, color: statusColor,
          transition: "all 0.2s ease",
        }}>
          {state.status === "pass" ? "✓" : state.status === "fail" ? "✗" : state.status === "na" ? "—" : item.sl}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: 600, fontSize: 14.5, color: "#18181b",
            lineHeight: 1.35, letterSpacing: -0.2,
          }}>
            {item.desc}
          </div>
          {!expanded && (
            <div style={{
              fontSize: 12.5, color: "#a1a1aa", marginTop: 3,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {item.expected}
            </div>
          )}
        </div>

        <div style={{
          fontSize: 16, color: "#d4d4d8", flexShrink: 0,
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
        }}>▾</div>
      </div>

      {expanded && (
        <div style={{
          marginTop: 14, paddingTop: 14,
          borderTop: "1px solid #f4f4f5",
          animation: "fadeIn 0.2s ease",
        }}>
          <div style={{
            background: "#fafafa", borderRadius: 10, padding: "10px 14px",
            marginBottom: 14, fontSize: 13, color: "#52525b", lineHeight: 1.55,
          }}>
            <span style={{ fontWeight: 700, color: "#18181b", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8 }}>
              Expected
            </span>
            <br />
            {item.expected}
          </div>

          <div style={{ marginBottom: 12 }}>
            <StatusToggle value={state.status} onChange={s => onUpdate({ ...state, status: s })} />
          </div>

          <textarea
            placeholder="Add remarks or observations..."
            value={state.remarks || ""}
            onChange={e => onUpdate({ ...state, remarks: e.target.value })}
            rows={2}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "10px 14px", borderRadius: 10,
              border: "1.5px solid #e5e7eb", fontSize: 13.5,
              fontFamily: "inherit", resize: "vertical",
              color: "#18181b", background: "#fafafa",
              outline: "none", transition: "border-color 0.15s",
            }}
            onFocus={e => e.target.style.borderColor = "#a78bfa"}
            onBlur={e => e.target.style.borderColor = "#e5e7eb"}
          />
        </div>
      )}
    </div>
  );
}

// ── Room Section ──
function RoomSection({ room, items, states, onUpdate }) {
  const [collapsed, setCollapsed] = useState(true);
  const completed = items.filter(i => states[i.sl]?.status).length;
  const passed = items.filter(i => states[i.sl]?.status === "pass").length;
  const failed = items.filter(i => states[i.sl]?.status === "fail").length;
  const pct = Math.round((completed / items.length) * 100);
  const icon = ROOM_ICONS[room] || "📋";

  return (
    <div style={{
      marginBottom: 16,
      borderRadius: 18,
      background: "#fff",
      border: "1.5px solid #eee",
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    }}>
      {/* Header */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        style={{
          padding: "18px 20px",
          cursor: "pointer",
          display: "flex", alignItems: "center", gap: 14,
          background: collapsed ? "#fff" : "#fafbff",
          transition: "background 0.2s ease",
          userSelect: "none",
        }}
      >
        <div style={{
          fontSize: 28, width: 48, height: 48, borderRadius: 14,
          background: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: 700, fontSize: 16, color: "#18181b",
            letterSpacing: -0.3,
          }}>{room}</div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginTop: 5,
            flexWrap: "wrap",
          }}>
            <div style={{
              flex: 1, minWidth: 80, maxWidth: 160, height: 6,
              background: "#f1f1f1", borderRadius: 4, overflow: "hidden",
            }}>
              <div style={{
                height: "100%", borderRadius: 4,
                width: `${pct}%`,
                background: failed > 0 ? "linear-gradient(90deg, #16a34a, #f59e0b)" : "linear-gradient(90deg, #16a34a, #22d3ee)",
                transition: "width 0.4s ease",
              }} />
            </div>
            <span style={{ fontSize: 12, color: "#71717a", fontWeight: 600, whiteSpace: "nowrap" }}>
              {completed}/{items.length}
            </span>
            {passed > 0 && (
              <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, background: "#dcfce7", padding: "2px 7px", borderRadius: 6 }}>
                {passed}✓
              </span>
            )}
            {failed > 0 && (
              <span style={{ fontSize: 11, color: "#dc2626", fontWeight: 700, background: "#fee2e2", padding: "2px 7px", borderRadius: 6 }}>
                {failed}✗
              </span>
            )}
          </div>
        </div>

        <div style={{
          fontSize: 18, color: "#a1a1aa", flexShrink: 0,
          transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
          transition: "transform 0.25s ease",
        }}>▾</div>
      </div>

      {/* Items */}
      {!collapsed && (
        <div style={{ padding: "4px 16px 16px" }}>
          {items.map((item, idx) => (
            <CheckItem
              key={item.sl}
              item={item}
              index={idx}
              state={states[item.sl] || {}}
              onUpdate={s => onUpdate(item.sl, s)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Room Navigation Pill ──
function RoomNav({ rooms, states, data, activeRoom, onSelect }) {
  const ref = useRef(null);
  return (
    <div ref={ref} style={{
      display: "flex", gap: 8, overflowX: "auto",
      padding: "12px 20px", WebkitOverflowScrolling: "touch",
      scrollbarWidth: "none", msOverflowStyle: "none",
    }}>
      {rooms.map(room => {
        const items = data[room] || [];
        const completed = items.filter(i => states[i.sl]?.status).length;
        const allDone = completed === items.length && items.length > 0;
        const active = activeRoom === room;
        return (
          <button
            key={room}
            onClick={() => onSelect(room)}
            style={{
              padding: "8px 16px",
              borderRadius: 12,
              border: "none",
              background: active ? "#18181b" : allDone ? "#dcfce7" : "#f4f4f5",
              color: active ? "#fff" : allDone ? "#16a34a" : "#52525b",
              fontSize: 13, fontWeight: 600,
              whiteSpace: "nowrap",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.15s ease",
            }}
          >
            {ROOM_ICONS[room] || "📋"} {room}
          </button>
        );
      })}
    </div>
  );
}

// ── Report Generator ──
function generateReportHTML(states, flatNumber, inspectionDate, enabledRooms) {
  const activeData = CHECKLIST_DATA.filter(i => enabledRooms.has(i.room));
  const grouped = groupByRoom(activeData);
  let totalPass = 0, totalFail = 0, totalNA = 0, totalPending = 0;

  activeData.forEach(item => {
    const s = states[item.sl]?.status;
    if (s === "pass") totalPass++;
    else if (s === "fail") totalFail++;
    else if (s === "na") totalNA++;
    else totalPending++;
  });

  const total = activeData.length;
  const completionPct = total > 0 ? Math.round(((total - totalPending) / total) * 100) : 0;

  let roomRows = "";
  ROOM_ORDER.filter(r => enabledRooms.has(r)).forEach(room => {
    const items = grouped[room] || [];
    if (!items.length) return;
    const roomPass = items.filter(i => states[i.sl]?.status === "pass").length;
    const roomFail = items.filter(i => states[i.sl]?.status === "fail").length;
    const roomNA = items.filter(i => states[i.sl]?.status === "na").length;
    const roomPending = items.length - roomPass - roomFail - roomNA;

    roomRows += `
      <tr style="background:#fafbff;"><td colspan="5" style="padding:12px 16px;font-weight:700;font-size:15px;color:#18181b;border-bottom:2px solid #e5e7eb;">
        ${ROOM_ICONS[room] || "📋"} ${room}
        <span style="float:right;font-size:12px;font-weight:600;color:#71717a;">
          <span style="color:#16a34a">${roomPass}✓</span> &nbsp;
          <span style="color:#dc2626">${roomFail}✗</span> &nbsp;
          <span style="color:#71717a">${roomNA} N/A</span> &nbsp;
          ${roomPending > 0 ? `<span style="color:#f59e0b">${roomPending} pending</span>` : ""}
        </span>
      </td></tr>`;

    items.forEach(item => {
      const st = states[item.sl] || {};
      const statusLabel =
        st.status === "pass" ? '<span style="color:#16a34a;font-weight:700">✓ PASS</span>' :
        st.status === "fail" ? '<span style="color:#dc2626;font-weight:700">✗ FAIL</span>' :
        st.status === "na" ? '<span style="color:#71717a;font-weight:600">— N/A</span>' :
        '<span style="color:#f59e0b;font-weight:600">⏳ Pending</span>';

      const rowBg = st.status === "fail" ? "#fff5f5" : "#fff";
      roomRows += `
        <tr style="background:${rowBg};">
          <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#71717a;font-size:13px;text-align:center;">${item.sl}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;font-weight:500;font-size:13.5px;color:#18181b;">${item.desc}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;font-size:12.5px;color:#52525b;">${item.expected}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;text-align:center;">${statusLabel}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;font-size:12.5px;color:#52525b;">${st.remarks || "—"}</td>
        </tr>`;
    });
  });

  // Failed items summary
  const failedItems = activeData.filter(i => states[i.sl]?.status === "fail");
  let failedSection = "";
  if (failedItems.length > 0) {
    failedSection = `
      <div style="margin-top:32px;padding:20px;background:#fff5f5;border:1.5px solid #fecaca;border-radius:14px;">
        <h3 style="margin:0 0 14px;color:#dc2626;font-size:17px;">⚠️ Items Requiring Attention (${failedItems.length})</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr style="background:#fee2e2;">
            <th style="padding:8px 12px;text-align:left;font-size:12px;color:#dc2626;border-bottom:1px solid #fecaca;">#</th>
            <th style="padding:8px 12px;text-align:left;font-size:12px;color:#dc2626;border-bottom:1px solid #fecaca;">Room</th>
            <th style="padding:8px 12px;text-align:left;font-size:12px;color:#dc2626;border-bottom:1px solid #fecaca;">Item</th>
            <th style="padding:8px 12px;text-align:left;font-size:12px;color:#dc2626;border-bottom:1px solid #fecaca;">Remarks</th>
          </tr>
          ${failedItems.map(item => `
            <tr>
              <td style="padding:8px 12px;border-bottom:1px solid #fee2e2;font-size:13px;color:#71717a;">${item.sl}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #fee2e2;font-size:13px;font-weight:600;">${item.room}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #fee2e2;font-size:13px;">${item.desc}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #fee2e2;font-size:13px;color:#52525b;">${states[item.sl]?.remarks || "—"}</td>
            </tr>`).join("")}
        </table>
      </div>`;
  }

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Flat Handover Report</title>
    <style>
      @media print { .no-print { display:none !important; } @page { margin: 14mm; } }
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #18181b; margin: 0; padding: 0; background: #f0f0f0; }
    </style></head><body>
    <div class="no-print" style="position:sticky;top:0;z-index:100;background:#18181b;padding:12px 24px;display:flex;justify-content:space-between;align-items:center;">
      <span style="color:#fff;font-weight:600;font-size:14px;">🏠 Flat Handover Report</span>
      <button onclick="window.print()" style="background:#fff;color:#18181b;border:none;padding:10px 22px;border-radius:8px;font-weight:700;cursor:pointer;font-size:14px;">🖨️ Print / Save as PDF</button>
    </div>
    <div style="max-width:1000px;margin:0 auto;padding:24px;background:#fff;min-height:100vh;box-sizing:border-box;">
      <div style="text-align:center;margin-bottom:32px;padding-bottom:24px;border-bottom:3px solid #18181b;">
        <h1 style="margin:0;font-size:26px;letter-spacing:-0.5px;">🏠 Flat Handover Inspection Report</h1>
        <p style="margin:8px 0 0;color:#71717a;font-size:14px;">Generated on ${new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      <div style="display:flex;gap:12px;margin-bottom:28px;">
        <div style="flex:1;background:#f9fafb;padding:14px 18px;border-radius:12px;"><span style="font-size:12px;color:#71717a;font-weight:600;">FLAT NUMBER</span><br/><strong>${flatNumber || "—"}</strong></div>
        <div style="flex:1;background:#f9fafb;padding:14px 18px;border-radius:12px;"><span style="font-size:12px;color:#71717a;font-weight:600;">INSPECTION DATE</span><br/><strong>${inspectionDate || new Date().toLocaleDateString("en-IN")}</strong></div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;">
        <div style="background:#dcfce7;padding:16px;border-radius:12px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:#16a34a;">${totalPass}</div>
          <div style="font-size:12px;color:#16a34a;font-weight:600;">PASSED</div>
        </div>
        <div style="background:#fee2e2;padding:16px;border-radius:12px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:#dc2626;">${totalFail}</div>
          <div style="font-size:12px;color:#dc2626;font-weight:600;">FAILED</div>
        </div>
        <div style="background:#f4f4f5;padding:16px;border-radius:12px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:#71717a;">${totalNA}</div>
          <div style="font-size:12px;color:#71717a;font-weight:600;">N/A</div>
        </div>
        <div style="background:#fef9c3;padding:16px;border-radius:12px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:#ca8a04;">${totalPending}</div>
          <div style="font-size:12px;color:#ca8a04;font-weight:600;">PENDING</div>
        </div>
      </div>

      <div style="margin-bottom:28px;height:8px;background:#f1f1f1;border-radius:6px;overflow:hidden;">
        <div style="height:100%;width:${completionPct}%;background:linear-gradient(90deg,#16a34a,#22d3ee);border-radius:6px;"></div>
      </div>

      ${failedSection}

      <table style="width:100%;border-collapse:collapse;margin-top:28px;border-radius:14px;overflow:hidden;border:1.5px solid #e5e7eb;">
        <thead>
          <tr style="background:#18181b;">
            <th style="padding:12px 14px;color:#fff;font-size:12px;text-align:center;width:40px;">#</th>
            <th style="padding:12px 14px;color:#fff;font-size:12px;text-align:left;">Description</th>
            <th style="padding:12px 14px;color:#fff;font-size:12px;text-align:left;">Expected</th>
            <th style="padding:12px 14px;color:#fff;font-size:12px;text-align:center;width:80px;">Status</th>
            <th style="padding:12px 14px;color:#fff;font-size:12px;text-align:left;">Remarks</th>
          </tr>
        </thead>
        <tbody>${roomRows}</tbody>
      </table>

      <div style="margin-top:48px;padding-top:24px;border-top:2px solid #e5e7eb;display:grid;grid-template-columns:1fr 1fr;gap:48px;">
        <div>
          <p style="font-size:13px;color:#71717a;margin:0 0 40px;">Inspector Signature</p>
          <div style="border-bottom:1.5px solid #18181b;width:200px;"></div>
          <p style="font-size:13px;font-weight:600;margin:8px 0 0;">________________</p>
        </div>
        <div>
          <p style="font-size:13px;color:#71717a;margin:0 0 40px;">Owner / Representative</p>
          <div style="border-bottom:1.5px solid #18181b;width:200px;"></div>
          <p style="font-size:13px;font-weight:600;margin:8px 0 0;">________________</p>
        </div>
      </div>
    </div>
  </body></html>`;
}

// ── Report Modal ──
function ReportModal({ onClose, states, enabledRooms }) {
  const [flatNumber, setFlatNumber] = useState("");
  const [inspectionDate, setInspectionDate] = useState(new Date().toISOString().split("T")[0]);
  const activeData = CHECKLIST_DATA.filter(i => enabledRooms.has(i.room));
  const total = activeData.length;
  const completed = activeData.filter(i => states[i.sl]?.status).length;
  const failed = activeData.filter(i => states[i.sl]?.status === "fail").length;

  const handleGenerate = () => {
    const html = generateReportHTML(states, flatNumber, inspectionDate, enabledRooms);
    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    onClose();
  };

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    padding: "12px 14px", borderRadius: 10,
    border: "1.5px solid #e5e7eb", fontSize: 14,
    fontFamily: "inherit", color: "#18181b",
    background: "#fafafa", outline: "none",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        animation: "fadeIn 0.2s ease",
        padding: "0 0 0 0",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: "24px 24px 0 0",
          width: "100%", maxWidth: 500,
          maxHeight: "90vh", overflowY: "auto",
          padding: "28px 24px 32px",
          animation: "slideUp 0.3s ease",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ width: 40, height: 4, background: "#d4d4d8", borderRadius: 4, margin: "0 auto 16px" }} />
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: -0.3, color: "#18181b" }}>
            Generate Report
          </h2>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "#71717a" }}>
            {completed}/{total} inspected • {failed} issues found
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: "#52525b", letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Flat / Unit Number
            </label>
            <input style={inputStyle} value={flatNumber} onChange={e => setFlatNumber(e.target.value)} placeholder="e.g. A-1204" />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: "#52525b", letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Inspection Date
            </label>
            <input style={inputStyle} type="date" value={inspectionDate} onChange={e => setInspectionDate(e.target.value)} />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          style={{
            width: "100%", marginTop: 22,
            padding: "16px", borderRadius: 14,
            border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #18181b, #3f3f46)",
            color: "#fff", fontSize: 15.5, fontWeight: 700,
            letterSpacing: -0.2,
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            transition: "all 0.2s ease",
          }}
        >
          📄 View Report
        </button>

        <button
          onClick={onClose}
          style={{
            width: "100%", marginTop: 10,
            padding: "14px", borderRadius: 14,
            border: "1.5px solid #e5e7eb", cursor: "pointer",
            background: "#fff", color: "#71717a",
            fontSize: 14, fontWeight: 600,
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Room Config Modal ──
function RoomConfigModal({ onClose, enabledRooms, setEnabledRooms }) {
  const toggle = (room) => {
    setEnabledRooms(prev => {
      const next = new Set(prev);
      if (next.has(room)) next.delete(room);
      else next.add(room);
      return next;
    });
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: "24px 24px 0 0",
          width: "100%", maxWidth: 500,
          maxHeight: "80vh", overflowY: "auto",
          padding: "28px 24px 32px",
          animation: "slideUp 0.3s ease",
        }}
      >
        <div style={{ width: 40, height: 4, background: "#d4d4d8", borderRadius: 4, margin: "0 auto 20px" }} />
        <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800, letterSpacing: -0.3, color: "#18181b" }}>
          Unit Layout
        </h2>
        <p style={{ margin: "0 0 20px", fontSize: 13, color: "#71717a" }}>
          Include only the rooms that exist in this unit.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {OPTIONAL_ROOMS.map(room => {
            const on = enabledRooms.has(room);
            const count = CHECKLIST_DATA.filter(i => i.room === room).length;
            return (
              <button
                key={room}
                onClick={() => toggle(room)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 16px", borderRadius: 14,
                  border: on ? "2px solid #7c3aed" : "2px solid #e5e7eb",
                  background: on ? "#faf5ff" : "#fafafa",
                  cursor: "pointer", textAlign: "left", width: "100%",
                  transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontSize: 24 }}>{ROOM_ICONS[room]}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#18181b" }}>{room}</div>
                  <div style={{ fontSize: 12, color: "#71717a", marginTop: 1 }}>{count} checklist items</div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: on ? "#7c3aed" : "#e5e7eb",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {on && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          style={{
            width: "100%", marginTop: 20,
            padding: "15px", borderRadius: 14,
            border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #18181b, #3f3f46)",
            color: "#fff", fontSize: 15, fontWeight: 700,
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

// ── Main App ──
export default function App() {
  const [states, setStates] = useState({});
  const [enabledRooms, setEnabledRooms] = useState(DEFAULT_ENABLED_ROOMS);
  const [activeRoom, setActiveRoom] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [filterMode, setFilterMode] = useState("all");
  const roomRefs = useRef({});
  const grouped = groupByRoom(CHECKLIST_DATA);

  // Load saved state
  useEffect(() => {
    try {
      const saved = JSON.parse(window.name || "{}");
      if (saved && typeof saved === "object" && Object.keys(saved).length > 0) {
        if (saved.states) {
          // New format
          setStates(saved.states);
          setEnabledRooms(new Set(saved.enabledRooms || [...DEFAULT_ENABLED_ROOMS]));
        } else {
          // Legacy format — just states object
          setStates(saved);
        }
      }
    } catch {}
  }, []);

  // Save state
  useEffect(() => {
    try { window.name = JSON.stringify({ states, enabledRooms: [...enabledRooms] }); } catch {}
  }, [states, enabledRooms]);

  const updateItem = (sl, state) => {
    setStates(prev => ({ ...prev, [sl]: state }));
  };

  const scrollToRoom = (room) => {
    setActiveRoom(room);
    roomRefs.current[room]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeData = CHECKLIST_DATA.filter(i => enabledRooms.has(i.room));
  const total = activeData.length;
  const completed = activeData.filter(i => states[i.sl]?.status).length;
  const passed = activeData.filter(i => states[i.sl]?.status === "pass").length;
  const failed = activeData.filter(i => states[i.sl]?.status === "fail").length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #f5f3ff 0%, #faf9ff 30%, #f8f8fa 100%)",
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        * { -webkit-tap-highlight-color: transparent; }
        *::-webkit-scrollbar { display: none; }
        input:focus, textarea:focus { border-color: #a78bfa !important; }
      `}</style>

      {/* Hero Header */}
      <div style={{
        background: "linear-gradient(135deg, #18181b 0%, #27272a 50%, #1e1b4b 100%)",
        padding: "48px 24px 28px",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.15), transparent)",
        }} />
        <h1 style={{
          margin: 0, fontSize: 24, fontWeight: 800,
          letterSpacing: -0.5, lineHeight: 1.2,
        }}>
          🏠 Flat Handover
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "#a1a1aa", fontWeight: 500 }}>
          Inspection Checklist
        </p>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10,
          marginTop: 20,
        }}>
          <div style={{
            background: "rgba(255,255,255,0.08)", borderRadius: 12,
            padding: "12px 14px", textAlign: "center",
            backdropFilter: "blur(10px)",
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#4ade80" }}>{passed}</div>
            <div style={{ fontSize: 11, color: "#a1a1aa", fontWeight: 600, marginTop: 2 }}>Passed</div>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.08)", borderRadius: 12,
            padding: "12px 14px", textAlign: "center",
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#f87171" }}>{failed}</div>
            <div style={{ fontSize: 11, color: "#a1a1aa", fontWeight: 600, marginTop: 2 }}>Failed</div>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.08)", borderRadius: 12,
            padding: "12px 14px", textAlign: "center",
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fbbf24" }}>{total - completed}</div>
            <div style={{ fontSize: 11, color: "#a1a1aa", fontWeight: 600, marginTop: 2 }}>Pending</div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ marginTop: 16 }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 6,
          }}>
            <span style={{ fontSize: 12, color: "#a1a1aa", fontWeight: 600 }}>Progress</span>
            <span style={{ fontSize: 13, color: "#fff", fontWeight: 700 }}>{pct}%</span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.12)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 4,
              width: `${pct}%`,
              background: "linear-gradient(90deg, #a78bfa, #22d3ee)",
              transition: "width 0.5s ease",
            }} />
          </div>
        </div>
      </div>

      {/* Room Nav Pills */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(248,248,250,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #eee",
      }}>
        <RoomNav
          rooms={ROOM_ORDER.filter(r => enabledRooms.has(r))}
          states={states}
          data={grouped}
          activeRoom={activeRoom}
          onSelect={scrollToRoom}
        />
      </div>

      {/* Filter Bar */}
      <div style={{
        padding: "12px 20px 4px", display: "flex", gap: 8, flexWrap: "wrap",
      }}>
        {[
          { key: "all", label: "All" },
          { key: "pending", label: "Pending" },
          { key: "fail", label: "Failed" },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilterMode(f.key)}
            style={{
              padding: "6px 14px", borderRadius: 8,
              border: filterMode === f.key ? "1.5px solid #a78bfa" : "1.5px solid #e5e7eb",
              background: filterMode === f.key ? "#f5f3ff" : "#fff",
              color: filterMode === f.key ? "#7c3aed" : "#71717a",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            {f.label}
          </button>
        ))}
        <button
          onClick={() => setShowConfig(true)}
          style={{
            marginLeft: "auto", padding: "6px 14px", borderRadius: 8,
            border: "1.5px solid #e5e7eb", background: "#fff",
            color: "#52525b", fontSize: 13, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 5,
          }}
        >
          ⚙️ Rooms
        </button>
      </div>

      {/* Room Sections */}
      <div style={{ padding: "12px 16px 120px" }}>
        {ROOM_ORDER.filter(r => enabledRooms.has(r)).map(room => {
          let items = grouped[room] || [];
          if (filterMode === "pending") {
            items = items.filter(i => !states[i.sl]?.status);
          } else if (filterMode === "fail") {
            items = items.filter(i => states[i.sl]?.status === "fail");
          }
          if (items.length === 0 && filterMode !== "all") return null;
          return (
            <div key={room} ref={el => (roomRefs.current[room] = el)} style={{ scrollMarginTop: 70 }}>
              <RoomSection
                room={room}
                items={items.length > 0 ? items : (grouped[room] || [])}
                states={states}
                onUpdate={updateItem}
              />
            </div>
          );
        })}
      </div>

      {/* Floating Report Button */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "12px 20px 28px",
        background: "linear-gradient(0deg, rgba(248,248,250,1) 70%, rgba(248,248,250,0))",
        zIndex: 99,
      }}>
        <button
          onClick={() => setShowReport(true)}
          style={{
            width: "100%", padding: "16px 24px",
            borderRadius: 16, border: "none",
            background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
            color: "#fff", fontSize: 16, fontWeight: 700,
            letterSpacing: -0.2, cursor: "pointer",
            boxShadow: "0 8px 30px rgba(124,58,237,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <span style={{ fontSize: 20 }}>📄</span>
          Generate Report
          {failed > 0 && (
            <span style={{
              background: "rgba(255,255,255,0.2)", padding: "3px 10px",
              borderRadius: 8, fontSize: 12, fontWeight: 700,
            }}>
              {failed} issues
            </span>
          )}
        </button>
      </div>

      {/* Report Modal */}
      {showReport && (
        <ReportModal onClose={() => setShowReport(false)} states={states} enabledRooms={enabledRooms} />
      )}

      {/* Room Config Modal */}
      {showConfig && (
        <RoomConfigModal
          onClose={() => setShowConfig(false)}
          enabledRooms={enabledRooms}
          setEnabledRooms={setEnabledRooms}
        />
      )}
    </div>
  );
}
