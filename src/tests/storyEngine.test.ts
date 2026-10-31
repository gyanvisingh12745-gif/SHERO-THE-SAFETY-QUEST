import { describe, it, expect, beforeEach } from 'vitest';
import { storyEngine } from '../utils/storyEngine';

describe('SHERO: Story State & Multi-Branching Ending Engine', () => {
  beforeEach(() => {
    storyEngine.resetMetrics();
  });

  it('initializes with balanced default metrics', () => {
    const metrics = storyEngine.getMetrics();
    expect(metrics.safety).toBe(65);
    expect(metrics.boundaries).toBe(50);
    expect(metrics.support).toBe(50);
    expect(metrics.independence).toBe(40);
  });

  it('updates metrics dynamically when player choices are recorded', () => {
    storyEngine.recordChoice('m3_node_1', 'm3_c1_b', {
      boundariesDelta: 20,
      safetyDelta: 10,
      relationshipTrustDelta: -10
    });

    const updated = storyEngine.getMetrics();
    expect(updated.boundaries).toBe(70);
    expect(updated.safety).toBe(75);
    expect(updated.relationshipTrust).toBe(60);
  });

  it('determines "The Autonomous Pioneer" ending when independence and boundaries are prioritized', () => {
    storyEngine.recordChoice('m6_node_1', 'm6_c1_a', {
      independenceDelta: 40,
      boundariesDelta: 20
    });

    const ending = storyEngine.determineEndingArchetype();
    expect(ending.id).toBe('autonomous_pioneer');
    expect(ending.title).toBe('The Autonomous Pioneer');
    expect(ending.keyThemes).toContain('Independent Housing');
  });

  it('determines "The Circle of Resilience" ending when support and friend disclosure are prioritized', () => {
    storyEngine.recordChoice('m7_node_1', 'm7_c1_b', {
      supportDelta: 30,
      setFriendDisclosure: 'full'
    });

    const ending = storyEngine.determineEndingArchetype();
    expect(ending.id).toBe('circle_of_resilience');
    expect(ending.title).toBe('The Circle of Resilience');
    expect(ending.badge).toBe('CIRCLE OF RESILIENCE');
  });

  it('determines "The Empowered Scholar" ending with high boundaries and academic determination', () => {
    storyEngine.recordChoice('m4_node_1', 'm4_c1_b', {
      boundariesDelta: 25,
      independenceDelta: 20
    });

    const ending = storyEngine.determineEndingArchetype();
    expect(ending.id).toBe('empowered_scholar');
    expect(ending.title).toBe('The Empowered Scholar');
  });
});
